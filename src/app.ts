// autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}

class ProjectInput {
  templateElement!: HTMLTemplateElement; // | undefined;
  hostElement: HTMLDivElement;
  element!: HTMLFormElement;
  titleInputElement!: HTMLInputElement;
  descriptionInputElement!: HTMLInputElement;
  peopleInputElement!: HTMLInputElement;

  constructor() {
    // this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    const templateEl = document.getElementById("project-input");
    if (templateEl) {
      this.templateElement = templateEl as HTMLTemplateElement;
      const importedNode = document.importNode(
        this.templateElement.content,
        true
      );
      this.element = importedNode.firstElementChild as HTMLFormElement;
      this.element.id = "user-input";
    }
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    // access different inputs
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }

  private configure() {
    // bind to submitHandler
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
