#!/usr/local/bin/python3
# -*- coding: utf-8 -*-

import tkinter as tk


class CanvasObject:
    def __init__(self, parent = None, x = 0, y = 0):
        self.parent = parent
        self.x = x
        self.y = y
        self.movable = True
        self.tkItems = []
        self.active = False

#
#     def activate(self): #/, x = x, y = self.y):
#         self.x = x
#         self.y = y
#         self.active
#     def deactivate(self):
#         self

    def draw(self):
        pass

    def refresh(self):
        for item in self.tkItems:
            self.parent.delete(item)
            #self.highlight()
        self.tkItems = []
        if self.active:
            self.draw()

    def move(self, xAmount, yAmount):
        for item in self.tkItems:
            item.move(xAmount, yAmount)

    def mouseOver(self, event):
        pass

    def highlight(self):
        pass
