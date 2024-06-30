export const CanServiceNowIntegrate = (() => {
  const graph = `graph TD
  classDef default line-height:1.5,text-align:left;
  InitSN[Initiated by Servicenow]
  InitOut[Initiated by Outside System]
  
  AppExposesAPIs{Does the App<br/> expose APIs}
  AppRunsSupportedDB{Does the app run<br/> a supported DB?}
  AppExportToFile{Can the App<br/> export to a<br/> file?}
  AppWSCalls{Can the App<br/> make Web<br/> Service calls?}
  AppEmail{Can the App<br/> Email out?}
  AppODBCDataSource{Can the App<br/> connect to a<br/> ODBC Data<br/> Source?}
  
  UseDataSource[Use a Data Source]
  UseJDBCDataSource[Use JDBC Data Source]
  UseOutboundWS[Use Outbound Webservices]
  UseInboundActions[Use Inbound Actions]
  UseStandardSNWS[Use Standard Servicenow APIs]
  UseOBDCConnector[Use ODBC Connector]
  No1[No we cannot integrate]
  No2[No we cannot integrate]
  
  
  InitSN            -- Creating Data-->AppExposesAPIs
  InitSN            -- Pulling Data -->AppRunsSupportedDB
  AppRunsSupportedDB-- No           -->AppExportToFile
  AppRunsSupportedDB-- Yes          -->UseJDBCDataSource
  AppExportToFile   -- No           -->AppExposesAPIs
  AppExportToFile   -- Yes          -->UseDataSource
  AppExposesAPIs    -- No           -->No1
  AppExposesAPIs    -- Yes          -->UseOutboundWS
  
  
  InitOut           -- Creating Data-->AppEmail
  InitOut           -- Pulling Data -->AppWSCalls
  AppEmail          -- No           -->AppWSCalls
  AppEmail          -- Yes          -->UseInboundActions
  AppWSCalls        -- No           -->AppODBCDataSource
  AppWSCalls        -- Yes          -->UseStandardSNWS
  AppODBCDataSource -- No           -->No2
  AppODBCDataSource -- Yes          -->UseOBDCConnector`;
  return graph;
})();
export const ConceptFulfillerTask = (() => {
  const graph = `graph LR
  Start[Start] --> Approval[Manager Approval]
  Approval--Approved--> Task[Fulfiller Task]
  Task-->End
  Approval--Rejected--> End
  subgraph Fulfiller Task
    FTAssigned[Task Assigned to Group]-->FTEmailGroup[Email To Group]
    FTEmailGroup-->TaskComplete[Task Complete]
  end`;
  return graph;
})();
export const ConceptDevIntake = (() => {
  const graph = `graph TB
  subgraph New
    NEW(State: New)
    A+D(State: Analysis + Design)
  end
  subgraph Backlog
    BAC(State: Backlog)
  end
  subgraph In Progress
    DEV(State: Development + Testing)  
    REQ(Approval: Requested)
    PRO(State: Production Change)
    DEP(State: Deploy)
  end
  subgraph Closed
    COM(State: Closed Complete)
  end
  CIN(State: Closed Incomplete)
  
  NEW--Removed-->CIN
  NEW--Requirements Clear: No-->A+D
  NEW--Requirements Clear: Yes-->BAC
  A+D--Removed-->CIN
  A+D-->BAC
  BAC-->DEV
  DEV--Work done-->REQ
  REQ--Approved-->PRO
  REQ--Rejected-->DEV
  PRO--Moved to other environments-->DEP
  DEP--Promoted-->COM`;
  return graph;
})();
export const ConceptDevIntake2 = (() => {
  const graph = `graph TB
    classDef default line-height:1.5,text-align:left;
  subgraph New
    NEW(State: New)
    A+D(State: Analysis + Design)
  end
  subgraph Backlog
    BAC(State: Backlog)
  end
  subgraph In Progress
    DEV(State: Development + Testing)  
    REQ(Approval: Requested)
    SPE(Copy Story)
    MVS(Move Original<br/>to Backlog or<br/>or next sprint)
  end
  subgraph Deploy
    PRO(State: Production Change)
    DEP(State: Deploy)
  end
  subgraph Closed
    COM(State: Closed Complete)
    CIN(State: Closed Incomplete)
  end
  
  NEW--Removed-->CIN
  NEW--Requirements Clear: No-->A+D
  NEW--Requirements Clear: Yes-->BAC
  A+D--Removed-->CIN
  A+D-->BAC
  BAC-->DEV
  DEV--Sprint Ended-->SPE
  DEV--Work done-->REQ
  REQ--Sprint Ended-->SPE
  SPE-->MVS
  MVS--Close Copy-->CIN
  REQ--Approved-->PRO
  REQ--Rejected-->DEV
  PRO--Moved to other environments-->DEP
  DEP--Promoted-->COM`;
  return graph;
})();

export const ConceptEventManagementIntake = (() => {
  const graph = `graph TD
    classDef default line-height:1.5,text-align:center;
  OS(Outside System)
  SN(Servicenow)
  SE(Event)
  SA(Alert<br/>Depending on Monitor, CI, or states)
  SR(Record)
  E0(End)
  
  OS--Sends in event-->SN
  SN-->SE
  SE-->SA
  SA--Suppressed-->E0
  SA--Not Suppressed-->SR
  SR-->E0`;
  return graph;
})();

export const ConceptIntegrationViaTask = (() => {
  const graph = `graph TD
  Start[Start]
  Task1[Task 1]
  Task2[Task 2]
  System1[System 1]
  System2[System 2]
  End[End]
  
  Start[Start] --> Task1
  Start[Start] --> Task2
  Task1-->Join
  Task2-->Join
  Join-->End
  subgraph SN Outbound Task Automation
    Task1--API Call-->System1
    System1--Does work to automate work-->System1
    System1--API Call to Close and Comment-->Task1
  end
  
  subgraph SN Inbound Task Automation
    System2--On a schedule polls for tasks from SN-->System2
    System2--API Call for Tasks Closes Task when complete-->Task2
  end`;
  return graph;
})();

export const ConceptOrderOfOperations = (() => {
  const graph = `sequenceDiagram
  participant uxux as User Interactions
  participant csup as UI Policy
  participant cscs as Client Script
  participant ssss as Server Side
  participant eeee as Engines
  participant dbdb as Database
  uxux->>ssss: Form Request
  ssss->>dbdb: Query Business Rules
  dbdb->>ssss: Display Business Rules
  ssss->>cscs: OnLoad Client Scripts
  cscs->>csup: OnLoad UI Policies
  csup->>uxux: Form loaded
  loop Every Change
      uxux->>ssss: ref_qual_element field changes
      ssss->>cscs: OnChange Client Scripts
      cscs->>csup: OnChange UI Policies
      csup->>uxux: Form Updated
  end
  uxux->>csup: Form Submit(client)
  csup->>cscs: OnSubmit Client Scripts
  cscs->>ssss: Form Submit(server)
  ssss->>eeee: Before Business Rules <1000
  eeee-->ssss: Approval engine
  eeee-->ssss: Assignment rules engine
  eeee-->ssss: Data policy engine
  eeee-->ssss: Escalation engine
  eeee-->ssss: Field normalization engine
  eeee-->ssss: Role engine
  eeee-->ssss: Execution plan engine
  eeee-->ssss: Update version engine
  eeee-->ssss: Workflow engine (for default workflows)
  eeee->>ssss: Before Business Rules >=1000
  ssss->>dbdb: Database Update
  dbdb->>ssss: After Business Rules <1000
  ssss-->eeee: Label engine
  ssss-->eeee: Listener engine
  ssss-->eeee: Table notifications engine
  Note right of eeee: This creates sysevents that process later
  ssss-->eeee: Role engine
  ssss-->eeee: Text indexing engine
  ssss-->eeee: Update sync engine
  ssss-->eeee: Data lookup engine inserts or updates
  ssss-->eeee: Workflow engine (for deferred workflows)
  ssss-->eeee: Trigger engine (for all Flow Designer flows)
  eeee->>ssss: After Business Rules >=1000
  ssss->>dbdb: Query Business Rules
  ssss-->dbdb: Async Business Rules
  Note right of eeee: This creates sys_triggers that process later
  dbdb->>ssss: Display Business Rules
  ssss->>uxux: Return UI
  
  Note over uxux,dbdb: Thanks to http://www.snc-blog.com/2017/02/02/script-execution-flow/`
  return graph;
})();
export const ConceptTransformMapOrder = (() => {
  const graph = `graph TD
    classDef default line-height:1.5,text-align:left;
  E1(onStart - Before the Import Rows are read)
  E2(onBefore - Before each Import Row is read)
  E3(onForeignInsert - Creates a Foreign Record<br/>onChoiceCreate</div> - Creates Choice Record)
  E4(onReject - If triggered entire Import Row is skipped)
  E5(onAfter - After the Import Row is read)
  E6(onComplete - After all the Import Rows are read)
  
  E1-->E2
  E2-->E3
  E3--Creates other Record-->E5
  E3--Fails to Create-->E4
  E4-->E5
  E5--No More Rows-->E6
  E5--More Rows-->E2`;
  return graph;
})();
export default [
  {
    label: 'Can ServiceNow Integrate',
    flow: CanServiceNowIntegrate
  },
  {
    label: 'Concept Fulfiller Task',
    flow: ConceptFulfillerTask
  },
  {
    label: 'Concept Dev Intake',
    flow: ConceptDevIntake
  },
  {
    label: 'Concept Dev Intake 2',
    flow: ConceptDevIntake2
  },
  {
    label: 'Concept Event Management Intake',
    flow: ConceptEventManagementIntake
  },
  {
    label: 'Concept Integration Via Task',
    flow: ConceptIntegrationViaTask
  },
  {
    label: 'Concept Order of Operations',
    flow: ConceptOrderOfOperations
  },
  {
    label: 'Concept Transform Map Order',
    flow: ConceptTransformMapOrder
  }
];