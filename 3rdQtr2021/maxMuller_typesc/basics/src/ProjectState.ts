class ProjectState{
  private projects: any[] = []
  private listeners: any[] = []
  private static instance: ProjectState;
  private constructor(){

  }
  static getInstance(){
    if(this.instance){
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }
  addProject(title: string, description: string, numberOfPeople: number){
    const newProject = {
      id: Math.random().toString(),
      title,
      description,
      people: numberOfPeople
    };
    this.projects.push(newProject)
    for(const listenerFn of this.listeners){
      listenerFn(this.projects.slice())
    }
  }

  addListener(listenerFn: any){
    this.listeners.push(listenerFn)
  }

}

export default ProjectState;