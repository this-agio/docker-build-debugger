
var Breakpoint = require('../../src/js/shared/breakpoint')

describe('Breakpoint', () => {
    it('is empty by default', () => {
        var breakpoints = new Breakpoint()
        expect(breakpoints.empty()).toBe(true)
        expect(breakpoints.list()).toEqual([])
    })

    it('breakpoint on 1', () => {
        var breakpoints = new Breakpoint()
        breakpoints.toggleBreakpointOn(1)
        expect(breakpoints.empty()).toBe(false)
        expect(breakpoints.list()).toEqual([1])
    })

    it('breakpoint on -1', () => {
        var breakpoints = new Breakpoint()
        breakpoints.toggleBreakpointOn(-1)
        expect(breakpoints.empty()).toBe(true)
        expect(breakpoints.list()).toEqual([])
    })

    it('breakpoint on 1,2 and toggle 3', () => {
        var breakpoints = new Breakpoint()
        breakpoints.toggleBreakpointOn(1)
        breakpoints.toggleBreakpointOn(3)
        breakpoints.toggleBreakpointOn(2)
        breakpoints.toggleBreakpointOn(3)
        expect(breakpoints.empty()).toBe(false)
        expect(breakpoints.list()).toEqual([1, 2])
    })
})