# Soma: the Soma Machine's control script for Ableton Live (ISS-118). Live loads it from the User
# Library's Remote Scripts folder (make live-install). It receives the score's CCs from the app's MIDI
# OUT and moves the named parameters of the named devices (rig.json, compiled from
# registry/audio/rig.yaml, names from the plugins' NKS presets).
from .soma import Soma


def create_instance(c_instance):
    return Soma(c_instance)
