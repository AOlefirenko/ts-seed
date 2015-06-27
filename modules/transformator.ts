/// <reference path="./../typings/tsd.d.ts" />

class RolledHelpersBuilder {
	currentBoxId: Number = 2

	constructor(private list: Rx.Observable<any>) {
	}

	setCurrent() {
		this.list = this.list.map((x) => {
			x.isCurrent = x.id === this.currentBoxId;
			return x;
		});
		return this
	}
	setHelpers() {
		this.list = this.list.
			concat(Rx.Observable.fromArray([null])).
			pairwise().
			map((x) => {
				return {
					current: x[0], next: x[1]
				}
			}).
			map((x) => {
                var config = {
                    boxId: x.current.id,
                    nextBoxTitle: x.next && x.next.title,
                    stickies: x.current.stickies,
                    currentStickyId: 0,
                    rolledUpObservable: new Rx.Subject()
                };
                x.current.helper = {};
                return x.current;
            });
		return this;
	}
	setStickiesExistence() {
		this.list = this.list.map((x) => {
			x.hasStickies = x.stickies.length > 0;
		})
		return this;
	}
	getObservable(): Rx.Observable<any> {
		return this.list;
	}
}
var boxes = [
	{ title: 'first', id: 1, stickies: [] },
	{ title: 'second', id: 2, stickies: [] },
	{ title: 'third', id: 3, stickies: [] },
	{ title: 'fourth', id: 4, stickies: [] }
];


var builder = new RolledHelpersBuilder(Rx.Observable.fromArray(boxes));

var list: Rx.Observable<any> = builder.setCurrent().
	setHelpers().
	setStickiesExistence().getObservable();

var manager = new RolledHelpersManager(list);

manager.asArray((x)=>{
	console.log(x);
})

class RolledHelpersManager {
	constructor(private data: Rx.Observable<any>) {

	}
	nextBox() {

	}
	asArray(callback){
		this.data.toArray().subscribe(callback)
	}
	onStateChanged(callback: Function) {

	}
	dispose() {

	}
}
	
