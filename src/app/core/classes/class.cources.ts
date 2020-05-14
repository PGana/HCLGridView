
export class ClassCources {
    id: number;
    name: string;
    duration: number;
    cost: number;
    tutor: string;
    startDate: Date;

    constructor(res) {
        this.id = res.id;
        this.name = res.name;
        this.duration = res.duration;
        this.cost = res.cost;
        this.tutor = res.tutor;
        this.startDate = res.startDate;
    }
}