"""obs_soma.py: OBS as the video desk (ISS-117). Builds the "Soma" scene collection over
obs-websocket: the app, Live, SpaceEngine, projectM and the camera, each a scene, and a Mix scene
layering them (SpaceEngine below, the app over it in Screen blend, projectM added faintly, the camera
small with its background removed). Flip, don't rebuild: Live and SpaceEngine are captured, not
redrawn; OBS's transition makes the flip a fade, not a window jump.

    python lib/video/obs_soma.py [--replace] [--url http://127.0.0.1:5173/]     (make obs-soma)

OBS is started if it is not running; its websocket is switched on in its own config (the password
OBS generated stays there, read at run time, never written anywhere else). Captures of programs not
running stay blank until they run (`make app-start`, Live, SpaceEngine, projectM).
"""
from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import time
from pathlib import Path

import obsws_python as obs

OBS_EXE = Path(r"C:\Program Files\obs-studio\bin\64bit\obs64.exe")
WS_CONFIG = Path(os.environ["APPDATA"]) / "obs-studio" / "plugin_config" / "obs-websocket" / "config.json"
COLLECTION = "Soma"
SCENES = ("Soma Machine", "Live", "SpaceEngine", "projectM", "Camera", "Mix")
W, H = 1920, 1080


def obs_running() -> bool:
    out = subprocess.run(["tasklist", "/FI", "IMAGENAME eq obs64.exe", "/NH"], capture_output=True, text=True).stdout
    return "obs64.exe" in out


def ws_config() -> dict:
    cfg = json.loads(WS_CONFIG.read_text(encoding="utf-8"))
    if not cfg.get("server_enabled"):
        if obs_running():
            sys.exit("OBS is running with its websocket off: Tools > WebSocket Server Settings > Enable, "
                     "or close OBS and run this again")
        cfg["server_enabled"] = True
        WS_CONFIG.write_text(json.dumps(cfg, indent=4), encoding="utf-8")
        print("obs-websocket switched on (OBS's own config)")
    return cfg


def connect(cfg: dict):
    if not obs_running():
        subprocess.Popen([str(OBS_EXE), "--minimize-to-tray", "--disable-shutdown-check"], cwd=OBS_EXE.parent)
        print("OBS started")
    for _ in range(60):
        try:
            return obs.ReqClient(host="localhost", port=cfg.get("server_port", 4455),
                                 password=cfg.get("server_password", ""), timeout=60)
        except Exception:
            time.sleep(1)
    sys.exit("could not reach obs-websocket")


def item_id(c, scene, source):
    return c.get_scene_item_id(scene, source).scene_item_id


def fit(c, scene, source, scale=1.0, x=0.0, y=0.0):
    sid = item_id(c, scene, source)
    c.set_scene_item_transform(scene, sid, {"boundsType": "OBS_BOUNDS_SCALE_INNER", "boundsWidth": W * scale,
                                            "boundsHeight": H * scale, "positionX": x, "positionY": y,
                                            "boundsAlignment": 0, "alignment": 5})
    return sid


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--replace", action="store_true")
    ap.add_argument("--url", default="http://127.0.0.1:5173/#ui=clean&labels=off")
    a = ap.parse_args()
    c = connect(ws_config())
    have = c.get_scene_collection_list().scene_collections
    if COLLECTION in have and not a.replace:
        sys.exit(f'the "{COLLECTION}" collection exists: --replace to build it again')
    if COLLECTION in have:
        c.set_current_scene_collection(COLLECTION)
        time.sleep(2)
        c.create_scene("_empty") if "_empty" not in [s["sceneName"] for s in c.get_scene_list().scenes] else None
        for s in c.get_scene_list().scenes:
            if s["sceneName"] != "_empty":
                c.remove_scene(s["sceneName"])
        for i in c.get_input_list().inputs:
            c.remove_input(i["inputName"])
        time.sleep(3)  # OBS removes in the background: names reused too soon are lost
    else:
        c.create_scene_collection(COLLECTION)
        time.sleep(3)
    c.set_video_settings(numerator=30, denominator=1, base_width=W, base_height=H, out_width=W, out_height=H)

    leftover = [s["sceneName"] for s in c.get_scene_list().scenes]
    for name in SCENES:
        if name not in leftover:
            c.create_scene(name)
    c.set_current_program_scene("Soma Machine")
    for name in leftover:
        if name not in SCENES:
            c.remove_scene(name)

    c.create_input("Soma Machine", "App", "browser_source",
                   {"url": a.url, "width": W, "height": H, "fps_custom": True, "fps": 60, "reroute_audio": True,
                    "shutdown": False, "restart_when_active": False}, True)
    c.create_input("Live", "Ableton Live", "window_capture",
                   {"window": "::Ableton Live 12 Suite.exe", "priority": 2, "method": 2, "cursor": False}, True)
    c.create_input("SpaceEngine", "SpaceEngine capture", "game_capture",
                   {"capture_mode": "window", "window": "::SpaceEngine.exe", "priority": 2}, True)
    c.create_input("projectM", "projectM capture", "game_capture",
                   {"capture_mode": "window", "window": "::projectMSDL.exe", "priority": 2}, True)
    c.create_input("Camera", "Integrated Camera", "dshow_input", {}, True)
    cams = c.get_input_properties_list_property_items("Integrated Camera", "video_device_id").property_items
    cam = next((p["itemValue"] for p in cams if "Integrated Camera" in p["itemName"]), cams[0]["itemValue"] if cams else "")
    c.set_input_settings("Integrated Camera", {"video_device_id": cam}, True)
    kinds = c.get_source_filter_kind_list().source_filter_kinds
    if "background_removal" in kinds:
        c.create_source_filter("Integrated Camera", "Background removal", "background_removal", {})
    for scene, source in (("Soma Machine", "App"), ("Live", "Ableton Live"), ("SpaceEngine", "SpaceEngine capture"),
                          ("projectM", "projectM capture"), ("Camera", "Integrated Camera")):
        fit(c, scene, source)

    # the Mix: SpaceEngine below, the app in Screen blend over it, projectM added faintly, the camera small
    for source in ("SpaceEngine capture", "App"):
        c.create_scene_item("Mix", source, True)
        fit(c, "Mix", source)
    c.set_scene_item_blend_mode("Mix", item_id(c, "Mix", "App"), "OBS_BLEND_SCREEN")
    c.create_input("Mix", "projectM layer", "game_capture",
                   {"capture_mode": "window", "window": "::projectMSDL.exe", "priority": 2}, True)
    fit(c, "Mix", "projectM layer")
    c.set_scene_item_blend_mode("Mix", item_id(c, "Mix", "projectM layer"), "OBS_BLEND_ADDITIVE")
    c.create_source_filter("projectM layer", "Faint", "color_filter_v2", {"opacity": 0.35})
    c.create_scene_item("Mix", "Integrated Camera", True)
    fit(c, "Mix", "Integrated Camera", scale=0.28, x=W * 0.70, y=H * 0.70)

    c.set_current_scene_transition("Fade")
    c.set_current_scene_transition_duration(600)
    rec = Path.home() / "Videos" / "Soma"
    rec.mkdir(parents=True, exist_ok=True)
    c.set_record_directory(str(rec))
    for k, v in (("RecFormat2", "hybrid_mp4"), ("RecQuality", "HQ"), ("RecEncoder", "nvenc")):
        c.set_profile_parameter("SimpleOutput", k, v)
    names = [s["sceneName"] for s in reversed(c.get_scene_list().scenes)]
    print(f'"{COLLECTION}": scenes {", ".join(names)}; camera {"found" if cam else "missing"}; '
          f"background removal {'on' if 'background_removal' in kinds else 'missing'}; recordings to {rec}")


if __name__ == "__main__":
    main()
