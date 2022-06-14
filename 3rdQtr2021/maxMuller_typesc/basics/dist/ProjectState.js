"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProjectState {
    constructor() {
        this.projects = [];
        this.listeners = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numberOfPeople) {
        const newProject = {
            id: Math.random().toString(),
            title,
            description,
            people: numberOfPeople
        };
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
exports.default = ProjectState;
//# sourceMappingURL=ProjectState.js.map