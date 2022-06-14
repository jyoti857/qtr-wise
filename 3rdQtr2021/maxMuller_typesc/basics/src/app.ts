// Drag and drop interfaces
interface Draggable{
  dragStartHandler(event: DragEvent): void
  dragEndHandler(event: DragEvent): void
}
interface DragTarget{
  dropOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void
}
// Projet type 
enum ProjectStatus{
  Active, 
  Finished
}
class Project {
  constructor(
    public id: string,
    public title: string,
    public desciption: string,
    public people: number,
    public status: ProjectStatus  // 'active' | 'finished'
  ){
    
  }
}
// project state management 
type Listener<T> = (items: T[]) => void

class State<T>{
  protected listeners: Listener<T>[] = []
  addListener(listenerFn: Listener<T>){
    this.listeners.push(listenerFn)
  }
}

// validation 
interface Validatable{
  value: string | number;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}
function validate(validatableInput: Validatable){
  let isValid = true;
  const {required, value, minLength, maxLength, min, max} = validatableInput
  if(required){
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if(minLength != null && typeof value === 'string'){
    isValid = isValid && value.length >= minLength;
  }
  if(maxLength != null && typeof value === 'string'){
    isValid = isValid && value.length <= maxLength;
  }
  if(min != null && typeof value==='number'){
    isValid = isValid && value >= min
  }
  if(max != null && typeof value==='number'){
    isValid = isValid && value <= max
  }
  return isValid;
}
// autobind decorator
function autobind(
  _: any,
  _2: any,
  descriptor: PropertyDescriptor
){
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: false,
    get(){
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor; 
}



// import ProjectState from "./ProjectState";
// const projectState = ProjectState.getInstance();
class ProjectState extends State<Project>{
  private projects: Project[] = []
  private static instance: ProjectState;
  private constructor(){
    super();
  }
  static getInstance(){
    if(this.instance){
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }
  addProject(title: string, description: string, numberOfPeople: number){
    // const newProject = {
    //   id: Math.random().toString(),
    //   title,
    //   description,
    //   people: numberOfPeople
    // };
    const newProject = new Project(Math.random().toString(), title, description, 
      numberOfPeople,
      ProjectStatus.Active 
    );
    this.projects.push(newProject)
    this.updateListeners();
  }
  moveProject(id: string, newStatus: ProjectStatus){
    const findProject = this.projects.find(pro => pro.id === id)
    if(findProject && findProject.status !== newStatus){
      findProject.status = newStatus;
      this.updateListeners();
    }
  }
  updateListeners(){
    for(const listenerFn of this.listeners){
      listenerFn(this.projects.slice())
    }
  }
}

const projectState = ProjectState.getInstance();

// Component base class 
abstract class Component<T extends HTMLElement, U extends HTMLElement>{
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;
  constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string){
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId) as T;
    const importedNode = document.importNode(this.templateElement.content, true)
    this.element = importedNode.firstElementChild as U;
    if(newElementId){
      this.element.id = newElementId
    }
    this.attach(insertAtStart);
  }
  private attach(insertAtBegining: boolean){
    this.hostElement.insertAdjacentElement(insertAtBegining ? 'afterbegin' : 'beforeend', this.element);
  }
  abstract configure(): void;
  abstract renderContent(): void;
}

// project item render class 
class ProjectItem extends Component<HTMLUListElement, HTMLElement> implements Draggable{
  private project: Project;

  get persons(){
    if(this.project.people === 1){
      return ' 1 person'
    }else return `${this.project.people} pserons `
  }
  constructor(hostId: string, project: Project){
    super("single-project", hostId, false, project.id)
    this.project = project;
    this.configure()
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent){
    event.dataTransfer!.setData('text/plain', this.project.id)
    event.dataTransfer!.effectAllowed = 'move'
  }
  dragEndHandler(event: DragEvent){
    console.log("drag end ")
  }
  configure(){
    this.element.addEventListener('dragstart', this.dragStartHandler)
    this.element.addEventListener('dragend', this.dragEndHandler)
  }
  renderContent(){
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned.';
    this.element.querySelector('p')!.textContent = this.project.desciption;

  }
}

// project list class 
class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
  assignedProjects: Project[];

  constructor(private type: 'active' | 'finished'){
    super('project-list', 'app', false, `${type}-projects`)
    this.assignedProjects = [];
   
    this.configure();
    this.renderContent();
  }
  @autobind
  dropOverHandler(event: DragEvent){
    if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain'){
      event.preventDefault(); // js does not default allow the drag and drop hence
      const listEle = this.element.querySelector('ul')!
      listEle.classList.add('droppable')
    }
  }
  @autobind
  dropHandler(event: DragEvent){
    const id = event.dataTransfer!.getData('text/plain')
    projectState.moveProject(id, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished)
  }

  @autobind
  dragLeaveHandler(event: DragEvent){
    const listEle = this.element.querySelector('ul')!
    listEle.classList.remove('droppable')
  }
  configure(){
    this.element.addEventListener('dragover', this.dropOverHandler)
    this.element.addEventListener('dragleave', this.dragLeaveHandler)
    this.element.addEventListener('drop', this.dropHandler)
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(project => {
        if(this.type === 'active'){
          return project.status === ProjectStatus.Active
        }
        return project.status === ProjectStatus.Finished
      })
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  };
  renderContent(){
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'
  }
  
  private renderProjects(){
    const listEle = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
    listEle.innerHTML = ''
    for(const projectItem of this.assignedProjects){
      // const listItem = document.createElement('li')
      // listItem.textContent = projectItem.title;
      // listEle.appendChild(listItem)
      new ProjectItem(this.element.querySelector('ul')!.id, projectItem)
    }
  }
  
}
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor(){
    super('project-input', 'app', true, 'user-input')
    this.titleInputElement = this.element.querySelector("#title")! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
    this.configure();
  }
  configure(){
    this.element.addEventListener('submit', this.submitHandler.bind(this))
  }
  renderContent(){}
  // clear input after submit 
  private clearInputs(args: HTMLInputElement[]){
    args.forEach(arg => {
      arg.value = '';
    })
  }
  private gatherInput(): [string, string, number] | void{
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;
    
    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true
    }
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5, 
      maxLength: 100
    }
    const peopleValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      min: 1, 
      max: 5
    }
    if(
      !validate(titleValidatable) || 
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ){
      alert("invalid input, please try again!")
      return;
    }else {

      return [enteredTitle, enteredDescription, +enteredPeople]
    }
  }
  // @autobind
  private submitHandler(evt: Event){
    evt.preventDefault();
    const userInput = this.gatherInput();
    if(Array.isArray(userInput)){
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people)
      console.log("title, desc, people ----> ", title, desc, people)
      this.clearInputs([this.titleInputElement, this.descriptionInputElement, this.peopleInputElement])
    }
  }
  
  
  
}


const x = new ProjectInput()
const activeProjects = new ProjectList('active')
const finishedProjects = new ProjectList('finished')