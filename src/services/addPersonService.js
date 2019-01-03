export default class {
    static store(data) {
        this.person = { ...this.person, ...data }
    }
    static storeStep(step) {
        this.step = step
    }
    static clear() {
        this.step = 0
        this.person = null
    }
}