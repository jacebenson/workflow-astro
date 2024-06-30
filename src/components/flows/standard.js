// this will export
// many components
// no approvals, one task
// 1 approval, 1 task
// 1 approval, 2 tasks (serial)
// 1 approval, 2 tasks (parallel)
// 2 approvals, 1 task
// 2 approvals, 2 tasks (serial)
// 2 approvals, 2 tasks (parallel)


// lets export an array of objects

export const StandardZeroApprovalOneTask = (() => {
    const graph = `graph LR
  S0(Start)
  T1(Task 1)
  E0(End)
  
  S0-->T1
  T1-->E0
  `;
    return graph;
})();

export const StandardZeroApprovalTwoTasksSerial = (() => {
    const graph = `graph LR
  S0(Start)
  T1(Task 1)
  T2(Task 2)
  E0(End)
  
  S0-->T1
  T1-->T2
  T2-->E0
  `;
    return graph;
})();

export const StandardZeroApprovalTwoTasksParallel = (() => {
    const graph = `graph LR
  S0(Start)
  T1(Task 1)
  T2(Task 2)
  E0(End)
  
  S0-->T1
  S0-->T2
  T1-->E0
  T2-->E0
  `;
    return graph;
})();

export const StandardOneApprovalOneTask = (() => {
    const graph = `graph LR
  S0(Start)
  A1(Approval 1)
  T1(Task 1)
  E0(End)
  
  S0-->A1
  A1--Rejected-->E0
  A1--Approved-->T1
  T1-->E0
  `;
    return graph;
})();

export const StandardOneApprovalTwoTasksSerial = (() => {
    const graph = `graph LR
  S0(Start)
  A1(Approval 1)
  T1(Task 1)
  T2(Task 2)
  E0(End)
  
  S0-->A1
  A1--Rejected-->E0
  A1--Approved-->T1
  T1-->T2
  T2-->E0
  `;
    return graph;
})();
export const StandardOneApprovalTwoTasksParallel = (() => {
    const graph = `graph LR
  S0(Start)
  A1(Approval 1)
  T1(Task 1)
  T2(Task 2)
  E0(End)
  
  S0-->A1
  A1--Rejected-->E0
  A1--Approved-->T1
  A1--Approved-->T2
  T1-->E0
  T2-->E0
  `;
    return graph;
})();
export const StandardTwoApprovalsOneTask = (() => {
    const graph = `graph LR
  S0(Start)
  A1(Approval 1)
  A2(Approval 2)
  T1(Task 1)
  E0(End)
  
  S0-->A1
  A1--Rejected-->E0
  A1--Approved-->A2
  A2--Rejected-->E0
  A2--Approved-->T1
  T1-->E0
  `;
    return graph;
})();
export const StandardTwoApprovalsTwoTasksSerial = (() => {
    const graph = `graph LR
  S0(Start)
  A1(Approval 1)
  A2(Approval 2)
  T1(Task 1)
  T2(Task 2)
  E0(End)
  
  S0-->A1
  A1--Rejected-->E0
  A1--Approved-->A2
  A2--Rejected-->E0
  A2--Approved-->T1
  T1-->T2
  T2-->E0
  `;
    return graph;
})();
export const StandardTwoApprovalsTwoTasksParallel = (() => {
    const graph = `graph LR
  S0(Start)
  A1(Approval 1)
  A2(Approval 2)
  T1(Task 1)
  T2(Task 2)
  E0(End)
  
  S0-->A1
  A1--Rejected-->E0
  A1--Approved-->A2
  A2--Rejected-->E0
  A2--Approved-->T1
  A2--Approved-->T2
  T1-->E0
  T2-->E0
  
  `;
    return graph;
})();

export default [
    {
        label: 'Zero Approval One Task',
        flow: StandardZeroApprovalOneTask
    },
    {
        label: 'Zero Approval Two Tasks Serial',
        flow: StandardZeroApprovalTwoTasksSerial
    },
    {
        label: 'Zero Approval Two Tasks Parallel',
        flow: StandardZeroApprovalTwoTasksParallel
    },
    {
        label: 'One Approval One Task',
        flow: StandardOneApprovalOneTask
    },
    {
        label: 'One Approval Two Tasks Serial',
        flow: StandardOneApprovalTwoTasksSerial
    },
    {
        label: 'One Approval Two Tasks Parallel',
        flow: StandardOneApprovalTwoTasksParallel
    },
    {
        label: 'Two Approvals One Task',
        flow: StandardTwoApprovalsOneTask
    },
    {
        label: 'Two Approvals Two Tasks Serial',
        flow: StandardTwoApprovalsTwoTasksSerial
    },
    {
        label: 'Two Approvals Two Tasks Parallel',
        flow: StandardTwoApprovalsTwoTasksParallel
    }
];