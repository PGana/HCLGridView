import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-demo',
    templateUrl: 'demo.component.html',
    styleUrls: ['demo.component.scss']
})
export class DemoComponent implements OnInit {
    message = 'Hello there';
    resPromise = [];

    ngOnInit() {
        let i = 0;
        const observerObj = new Observable((observer) => {
            observer.next('Hello there');
            observer.next('I am fine how are you');
            observer.next('Thanks, Iam good');
            setInterval(() => {
                observer.next(`Hello ${i++}`);
            }, 2000);
            /// Comunication get end when you call the complete method
            // observer.complete();
            // observer.next('Not bad');

            /// You can also use error
            // observer.error('You are not man');
        });

        /// create refrece varibale so that we can it gives us option  to terminate subscription
        const obj = observerObj.subscribe(
            (res: any) => this.resPromise.push(res),
            err => console.log(err),
            () => this.resPromise.push('Completed')
        );

        /**
         * What if you have mutiple subscription on same observable.
         * Deffinityly we have duplciate values, how do we unsubscribe at once ?
         * all we have to do is  consider second as child observer
         * like belo
         */
        const obj2 = observerObj.subscribe(res => this.resPromise.push(res));

        /// Append obj2 as child observer
        obj.add(obj2);


        setTimeout(() => {
            obj.unsubscribe();
        }, 10000);

        this.onSubjectObs();
        this.onbehaviourSubject();
    }

    /**
     * Subject is different from observable,
     * because observer will emit the value (observer.next([value])) outside of the observable function.
     * Observer emitted values only subscibe after subsciption initialized.
     * That means, observer.next has to use ofter subscribe the observer.
     *
     */
    onSubjectObs() {
        const obs = new Subject();
        /// This line will not get emit because it's before subscribe
        obs.next('Hello');
        const sub = obs.subscribe(
            data => {
                // console.log('Subject 1: ' + data)
            }
        );
        obs.next('Hello there Here I am ');
    }

    /**
     * Behavior Subject is one type of subject, which has its own features such as
     * 1. Default emit value(where is no observer to emit the value) call when we create instace of bheaviorsubject
     * 2. it call emit value even in before or after subscribe the observable.
     */
    onbehaviourSubject() {
        const behavior = new BehaviorSubject('first call');
        behavior.next('Second Call');
        const sub = behavior.subscribe(data => console.log('Behavior Sub: ' + data));
        behavior.next('3rd Call');
    }
}
