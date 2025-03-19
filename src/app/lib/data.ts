export const boardData = {
    columns: {
      "pending": {
        id: "Pending",
        title: "Pending",
        bgColor: "rgba(255, 193, 7,0.4)",
        bgDotColor: "rgb(255, 193, 7)",
        taskIds: ["task-2", "task-3"],
      },
      "in-progress": {
        id: "In-progress",
        title: "In Progress",
        bgColor: "rgba(30, 160, 236,0.4)",
        bgDotColor: "rgb(30, 160, 236)",
        taskIds: ['task-4'],
      },
      "review": {
        id: "Review",
        title: "Review",
        bgColor: "rgba(255, 87, 34,0.4)",
        bgDotColor: "rgb(255, 87, 34)",
        taskIds: ["task-5"],
      },
      "done": {
        id: "Done",
        title: "Done",
        bgColor: "rgba(40, 167, 69,0.4)",
        bgDotColor: "rgb(40, 167, 69)",
        taskIds: ['task-1'],
      },
    },
    tasks: {
      "task-1": {
        id: "task-1",
        content: "Fix Login Issue",
        description: "Investigate and resolve the login failure issue affecting multiple users.",
        status: "Done",
        assignee: "John Doe",
        date: "2025-03-15",
        priority: "High",
        priorityColor: "rgb(220, 53, 69)",
        comments: [
          "Is the issue reproducible on all devices?",
          "Have we checked the backend logs for potential errors?",
          "Is it related to OAuth or session handling?",
          "Should we roll back the last update?",
          "Are there any workarounds available for users?"
        ],
        attachments: 2
      },
      "task-2": {
        id: "task-2",
        content: "UI Glitch on Dashboard",
        description: "Fix the misalignment issue on the user dashboard affecting mobile views.",
        status: "Pending",
        assignee: "Jane Smith",
        date: "2025-03-16",
        priority: "Medium",
        priorityColor: "rgb(255, 153, 51)",
        comments: [
          "Is the issue present in all screen sizes?",
          "Have we tested it in both light and dark modes?",
          "Should we adjust the flexbox properties?",
          "Can we replicate it in production?"
        ],
        attachments: 1
      },
      "task-3": {
        id: "task-3",
        content: "API Timeout Issue",
        description: "Investigate why the user profile API is timing out under heavy load.",
        status: "Pending",
        assignee: "Alice Johnson",
        date: "2025-03-17",
        priority: "Low",
        priorityColor: "rgb(29, 77, 45)",
        comments: [
          "Have we checked the server load during peak hours?",
          "Is the database query optimized for large data sets?"
        ],
        attachments: 3
      },
      "task-4": {
        id: "task-4",
        content: "Fix Payment Gateway Error",
        description: "Users are reporting failed transactions during checkout.",
        status: "In Progress",
        assignee: "Michael Brown",
        date: "2025-03-18",
        priority: "High",
        priorityColor: "rgb(220, 53, 69)",
        comments: [
          "Is it affecting all payment methods?",
          "Have we reached out to the payment provider?",
          "Should we provide an alternative payment option?",
          "Is the error logged on the backend?"
        ],
        attachments: 2
      },
      "task-5": {
        id: "task-5",
        content: "Review Error Handling",
        description: "Review and improve the error handling mechanisms across the app.",
        status: "Review",
        assignee: "David Miller",
        date: "2025-03-19",
        priority: "Medium",
        priorityColor: "rgb(255, 153, 51)",
        comments: [
          "Do we have a fallback for network errors?",
          "Should we add user-friendly error messages?",
          "Have we tested it on slow network connections?",
          "Should we notify users when an error is resolved?"
        ],
        attachments: 1
      },
    },
    columnOrder: ["pending", "in-progress", "review", "done"],
  };
  