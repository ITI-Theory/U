{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 6,
			"bugfix" : 3,
			"rev" : 0,
			"architecture" : "x64",
			"modernui" : 1
		},
		"visible" : 1,
		"rect" : [ 100.0, 100.0, 960.0, 320.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"description" : "Movie OSC Receiver — listens on UDP 9000 for /movie/e/* and /field/H from field_render.py. Ctrl+M any dial to map it to a Live parameter.",
		"boxes" : [ 		{
			"box" : 			{
				"id" : "obj-1",
				"maxclass" : "newobj",
				"numinlets" : 0,
				"numoutlets" : 1,
				"outlettype" : [ "" ],
				"patching_rect" : [ 30.0, 20.0, 130.0, 22.0 ],
				"text" : "udpreceive 9000"
			}
		},
		{
			"box" : 			{
				"id" : "obj-2",
				"maxclass" : "newobj",
				"numinlets" : 1,
				"numoutlets" : 11,
				"outlettype" : [ "", "", "", "", "", "", "", "", "", "", "" ],
				"patching_rect" : [ 30.0, 55.0, 895.0, 22.0 ],
				"text" : "route /movie/e/safety /movie/e/fear /movie/e/curiosity /movie/e/awe /movie/e/grief /movie/e/language /movie/e/preverbal /movie/e/shame /movie/t /field/H"
			}
		},
		{
			"box" : 			{
				"id" : "obj-3",
				"maxclass" : "live.dial",
				"numinlets" : 1,
				"numoutlets" : 2,
				"outlettype" : [ "", "float" ],
				"parameter_enable" : 1,
				"patching_rect" : [ 15.0, 95.0, 44.0, 47.0 ],
				"saved_attribute_attributes" : 				{
					"valueof" : 					{
						"parameter_initial" : [ 0.0 ],
						"parameter_initial_enable" : 1,
						"parameter_longname" : "Safety[1]",
						"parameter_mmin" : 0.0,
						"parameter_mmax" : 1.0,
						"parameter_shortname" : "Safety",
						"parameter_type" : 0,
						"parameter_unitstyle" : 0
					}
				}
			}
		},
		{
			"box" : 			{
				"id" : "obj-4",
				"maxclass" : "live.dial",
				"numinlets" : 1,
				"numoutlets" : 2,
				"outlettype" : [ "", "float" ],
				"parameter_enable" : 1,
				"patching_rect" : [ 105.0, 95.0, 44.0, 47.0 ],
				"saved_attribute_attributes" : 				{
					"valueof" : 					{
						"parameter_initial" : [ 0.0 ],
						"parameter_initial_enable" : 1,
						"parameter_longname" : "Fear[1]",
						"parameter_mmin" : 0.0,
						"parameter_mmax" : 1.0,
						"parameter_shortname" : "Fear",
						"parameter_type" : 0,
						"parameter_unitstyle" : 0
					}
				}
			}
		},
		{
			"box" : 			{
				"id" : "obj-5",
				"maxclass" : "live.dial",
				"numinlets" : 1,
				"numoutlets" : 2,
				"outlettype" : [ "", "float" ],
				"parameter_enable" : 1,
				"patching_rect" : [ 195.0, 95.0, 44.0, 47.0 ],
				"saved_attribute_attributes" : 				{
					"valueof" : 					{
						"parameter_initial" : [ 0.0 ],
						"parameter_initial_enable" : 1,
						"parameter_longname" : "Curiosity[1]",
						"parameter_mmin" : 0.0,
						"parameter_mmax" : 1.0,
						"parameter_shortname" : "Curios",
						"parameter_type" : 0,
						"parameter_unitstyle" : 0
					}
				}
			}
		},
		{
			"box" : 			{
				"id" : "obj-6",
				"maxclass" : "live.dial",
				"numinlets" : 1,
				"numoutlets" : 2,
				"outlettype" : [ "", "float" ],
				"parameter_enable" : 1,
				"patching_rect" : [ 285.0, 95.0, 44.0, 47.0 ],
				"saved_attribute_attributes" : 				{
					"valueof" : 					{
						"parameter_initial" : [ 0.0 ],
						"parameter_initial_enable" : 1,
						"parameter_longname" : "Awe[1]",
						"parameter_mmin" : 0.0,
						"parameter_mmax" : 1.0,
						"parameter_shortname" : "Awe",
						"parameter_type" : 0,
						"parameter_unitstyle" : 0
					}
				}
			}
		},
		{
			"box" : 			{
				"id" : "obj-7",
				"maxclass" : "live.dial",
				"numinlets" : 1,
				"numoutlets" : 2,
				"outlettype" : [ "", "float" ],
				"parameter_enable" : 1,
				"patching_rect" : [ 375.0, 95.0, 44.0, 47.0 ],
				"saved_attribute_attributes" : 				{
					"valueof" : 					{
						"parameter_initial" : [ 0.0 ],
						"parameter_initial_enable" : 1,
						"parameter_longname" : "Grief[1]",
						"parameter_mmin" : 0.0,
						"parameter_mmax" : 1.0,
						"parameter_shortname" : "Grief",
						"parameter_type" : 0,
						"parameter_unitstyle" : 0
					}
				}
			}
		},
		{
			"box" : 			{
				"id" : "obj-8",
				"maxclass" : "live.dial",
				"numinlets" : 1,
				"numoutlets" : 2,
				"outlettype" : [ "", "float" ],
				"parameter_enable" : 1,
				"patching_rect" : [ 465.0, 95.0, 44.0, 47.0 ],
				"saved_attribute_attributes" : 				{
					"valueof" : 					{
						"parameter_initial" : [ 0.0 ],
						"parameter_initial_enable" : 1,
						"parameter_longname" : "Language[1]",
						"parameter_mmin" : 0.0,
						"parameter_mmax" : 1.0,
						"parameter_shortname" : "Lang",
						"parameter_type" : 0,
						"parameter_unitstyle" : 0
					}
				}
			}
		},
		{
			"box" : 			{
				"id" : "obj-9",
				"maxclass" : "live.dial",
				"numinlets" : 1,
				"numoutlets" : 2,
				"outlettype" : [ "", "float" ],
				"parameter_enable" : 1,
				"patching_rect" : [ 555.0, 95.0, 44.0, 47.0 ],
				"saved_attribute_attributes" : 				{
					"valueof" : 					{
						"parameter_initial" : [ 0.0 ],
						"parameter_initial_enable" : 1,
						"parameter_longname" : "Preverbal[1]",
						"parameter_mmin" : 0.0,
						"parameter_mmax" : 1.0,
						"parameter_shortname" : "Prev",
						"parameter_type" : 0,
						"parameter_unitstyle" : 0
					}
				}
			}
		},
		{
			"box" : 			{
				"id" : "obj-10",
				"maxclass" : "live.dial",
				"numinlets" : 1,
				"numoutlets" : 2,
				"outlettype" : [ "", "float" ],
				"parameter_enable" : 1,
				"patching_rect" : [ 645.0, 95.0, 44.0, 47.0 ],
				"saved_attribute_attributes" : 				{
					"valueof" : 					{
						"parameter_initial" : [ 0.0 ],
						"parameter_initial_enable" : 1,
						"parameter_longname" : "Shame[1]",
						"parameter_mmin" : 0.0,
						"parameter_mmax" : 1.0,
						"parameter_shortname" : "Shame",
						"parameter_type" : 0,
						"parameter_unitstyle" : 0
					}
				}
			}
		},
		{
			"box" : 			{
				"id" : "obj-11",
				"maxclass" : "live.dial",
				"numinlets" : 1,
				"numoutlets" : 2,
				"outlettype" : [ "", "float" ],
				"parameter_enable" : 1,
				"patching_rect" : [ 735.0, 95.0, 44.0, 47.0 ],
				"saved_attribute_attributes" : 				{
					"valueof" : 					{
						"parameter_initial" : [ 0.0 ],
						"parameter_initial_enable" : 1,
						"parameter_longname" : "StoryTime[1]",
						"parameter_mmin" : 0.0,
						"parameter_mmax" : 1.0,
						"parameter_shortname" : "t",
						"parameter_type" : 0,
						"parameter_unitstyle" : 0
					}
				}
			}
		},
		{
			"box" : 			{
				"id" : "obj-12",
				"maxclass" : "flonum",
				"numinlets" : 1,
				"numoutlets" : 2,
				"outlettype" : [ "float", "bang" ],
				"patching_rect" : [ 827.0, 103.0, 60.0, 22.0 ]
			}
		},
		{
			"box" : 			{
				"id" : "obj-13",
				"maxclass" : "comment",
				"numinlets" : 1,
				"numoutlets" : 0,
				"patching_rect" : [ 8.0, 148.0, 65.0, 20.0 ],
				"text" : "Safety"
			}
		},
		{
			"box" : 			{
				"id" : "obj-14",
				"maxclass" : "comment",
				"numinlets" : 1,
				"numoutlets" : 0,
				"patching_rect" : [ 101.0, 148.0, 65.0, 20.0 ],
				"text" : "Fear"
			}
		},
		{
			"box" : 			{
				"id" : "obj-15",
				"maxclass" : "comment",
				"numinlets" : 1,
				"numoutlets" : 0,
				"patching_rect" : [ 186.0, 148.0, 65.0, 20.0 ],
				"text" : "Curiosity"
			}
		},
		{
			"box" : 			{
				"id" : "obj-16",
				"maxclass" : "comment",
				"numinlets" : 1,
				"numoutlets" : 0,
				"patching_rect" : [ 285.0, 148.0, 65.0, 20.0 ],
				"text" : "Awe"
			}
		},
		{
			"box" : 			{
				"id" : "obj-17",
				"maxclass" : "comment",
				"numinlets" : 1,
				"numoutlets" : 0,
				"patching_rect" : [ 374.0, 148.0, 65.0, 20.0 ],
				"text" : "Grief"
			}
		},
		{
			"box" : 			{
				"id" : "obj-18",
				"maxclass" : "comment",
				"numinlets" : 1,
				"numoutlets" : 0,
				"patching_rect" : [ 460.0, 148.0, 65.0, 20.0 ],
				"text" : "Language"
			}
		},
		{
			"box" : 			{
				"id" : "obj-19",
				"maxclass" : "comment",
				"numinlets" : 1,
				"numoutlets" : 0,
				"patching_rect" : [ 549.0, 148.0, 65.0, 20.0 ],
				"text" : "Preverbal"
			}
		},
		{
			"box" : 			{
				"id" : "obj-20",
				"maxclass" : "comment",
				"numinlets" : 1,
				"numoutlets" : 0,
				"patching_rect" : [ 644.0, 148.0, 65.0, 20.0 ],
				"text" : "Shame"
			}
		},
		{
			"box" : 			{
				"id" : "obj-21",
				"maxclass" : "comment",
				"numinlets" : 1,
				"numoutlets" : 0,
				"patching_rect" : [ 735.0, 148.0, 65.0, 20.0 ],
				"text" : "t  (story)"
			}
		},
		{
			"box" : 			{
				"id" : "obj-22",
				"maxclass" : "comment",
				"numinlets" : 1,
				"numoutlets" : 0,
				"patching_rect" : [ 825.0, 130.0, 75.0, 20.0 ],
				"text" : "H (energy)"
			}
		},
		{
			"box" : 			{
				"id" : "obj-23",
				"maxclass" : "comment",
				"numinlets" : 1,
				"numoutlets" : 0,
				"patching_rect" : [ 15.0, 180.0, 700.0, 20.0 ],
				"text" : "Ctrl+M  →  click a dial  →  move a knob / click a Live param  →  mapped.   Source: field_render.py --verbose   port 9000"
			}
		},
		{
			"box" : 			{
				"id" : "obj-24",
				"maxclass" : "comment",
				"numinlets" : 1,
				"numoutlets" : 0,
				"patching_rect" : [ 15.0, 200.0, 700.0, 20.0 ],
				"text" : "Pipeline:  lake exe Movie  |  python instrument/field_render.py  →  OSC here  →  Ableton params"
			}
		} ],
		"lines" : [ 		{
			"patchline" : 			{
				"source" : [ "obj-1", 0 ],
				"destination" : [ "obj-2", 0 ]
			}
		},
		{
			"patchline" : 			{
				"source" : [ "obj-2", 0 ],
				"destination" : [ "obj-3", 0 ]
			}
		},
		{
			"patchline" : 			{
				"source" : [ "obj-2", 1 ],
				"destination" : [ "obj-4", 0 ]
			}
		},
		{
			"patchline" : 			{
				"source" : [ "obj-2", 2 ],
				"destination" : [ "obj-5", 0 ]
			}
		},
		{
			"patchline" : 			{
				"source" : [ "obj-2", 3 ],
				"destination" : [ "obj-6", 0 ]
			}
		},
		{
			"patchline" : 			{
				"source" : [ "obj-2", 4 ],
				"destination" : [ "obj-7", 0 ]
			}
		},
		{
			"patchline" : 			{
				"source" : [ "obj-2", 5 ],
				"destination" : [ "obj-8", 0 ]
			}
		},
		{
			"patchline" : 			{
				"source" : [ "obj-2", 6 ],
				"destination" : [ "obj-9", 0 ]
			}
		},
		{
			"patchline" : 			{
				"source" : [ "obj-2", 7 ],
				"destination" : [ "obj-10", 0 ]
			}
		},
		{
			"patchline" : 			{
				"source" : [ "obj-2", 8 ],
				"destination" : [ "obj-11", 0 ]
			}
		},
		{
			"patchline" : 			{
				"source" : [ "obj-2", 9 ],
				"destination" : [ "obj-12", 0 ]
			}
		} ]
	}
}
