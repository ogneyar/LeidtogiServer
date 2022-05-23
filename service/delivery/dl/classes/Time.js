


module.exports = class Time {
   
    worktimeStart // Начало периода передачи груза.
    worktimeEnd // Окончание периода передачи груза.

    // -------------------
    // необязательные поля
    // -------------------

    breakStart // Начало перерыва.
    breakEnd // Окончание перерыва.
    exactTime //Передача груза в точное время.


    constructor(data) {
        if ( ! data ) data = {}
        this.worktimeStart = data.worktimeStart || "9:00"
        this.worktimeEnd = data.worktimeEnd || "18:00"

        this.breakStart = data.breakStart || undefined
        this.breakEnd = data.breakEnd || undefined
        this.exactTime = data.exactTime || undefined
    }
}
