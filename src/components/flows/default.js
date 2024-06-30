export const flow = (() => {
    const graph = `graph TD
  A[Christmas] -->|Get money| B(Go shopping)
  B --> C{Let me think}
  C -->|One| D[Laptop]
  C -->|Two| E[iPhone]
  C -->|Three| F[fa:fa-car Car]`
    return graph;
})();

export const sequence = (() => {
    const graph = `sequenceDiagram
  Alice->>+John: Hello John, how are you?
  Alice->>+John: John, can you hear me?
  John-->>-Alice: Hi Alice, I can hear you!
  John-->>-Alice: I feel great!`;
    return graph;
})();
export const classDiagram = (() => {
    const graph = `classDiagram
  Animal <|-- Duck
  Animal <|-- Fish
  Animal <|-- Zebra
  Animal : +int age
  Animal : +String gender
  Animal: +isMammal()
  Animal: +mate()
  class Duck{
    +String beakColor
    +swim()
    +quack()
  }
  class Fish{
    -int sizeInFeet
    -canEat()
  }
  class Zebra{
    +bool is_wild
    +run()
  }`;
    return graph;
})();
export const stateDiagram = (() => {
    const graph = `stateDiagram
  [*] --> Still
  Still --> [*]
  Still --> Moving
  Moving --> Still
  Moving --> Crash
  Crash --> [*]`;
    return graph;
})();
export const gantt = (() => {
    const graph = `gantt
  title A Gantt Diagram
  dateFormat  YYYY-MM-DD
  section Section
  A task           :a1, 2014-01-01, 30d
  Another task     :after a1  , 20d
  section Another
  Task in sec      :2014-01-12  , 12d
  another task      : 24d`;
    return graph;
})();
export const pie = (() => {
    const graph = `pie title Pets adopted by volunteers
  "Dogs" : 386
  "Cats" : 85
  "Rats" : 15`;
    return graph;
})();
export const erDiagram = (() => {
    const graph = `erDiagram
  CUSTOMER }|..|{ DELIVERY-ADDRESS : has
  CUSTOMER ||--o{ ORDER : places
  CUSTOMER ||--o{ INVOICE : "liable for"
  DELIVERY-ADDRESS ||--o{ ORDER : receives
  INVOICE ||--|{ ORDER : covers
  ORDER ||--|{ ORDER-ITEM : includes
  PRODUCT-CATEGORY ||--|{ PRODUCT : contains
  PRODUCT ||--o{ ORDER-ITEM : "ordered in"`;
    return graph;
})();

export default [
    {
        label: 'Flow',
        flow: flow
    },
    {
        label: 'Sequence',
        flow: sequence
    },
    {
        label: 'Class Diagram',
        flow: classDiagram
    },
    {
        label: 'State Diagram',
        flow: stateDiagram
    },
    {
        label: 'Gantt',
        flow: gantt
    },
    {
        label: 'Pie',
        flow: pie
    },
    {
        label: 'ER Diagram',
        flow: erDiagram
    }
];
