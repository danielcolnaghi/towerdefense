# exports each selected object into its own file

import bpy, math

knob = bpy.data.objects["RotateAllObjects"]
knob.rotation_mode = 'XYZ'

rotate_by = 45   #How many degrees to rotate the knob for every step
start_angle = 45      #What angle to start from

for x in range(1,9):
    angle = (start_angle * (math.pi/180)) + (x*-1) * (rotate_by * (math.pi/180))
    knob.rotation_euler = ( 0, 0, angle )

    bpy.context.scene.render.filepath = "G:\\GameJam\\TowerDefense\\player\\car%d.png" % (x)
    bpy.ops.render.render(write_still=True, use_viewport=True)