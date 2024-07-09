export const getLabelClass = (value) => {
    switch (value) {
      case "Active":
        return "status-btn badge-gradient-success";
      case "Open":
        return "status-btn badge-gradient-info";
      case "In Active":
        return "status-btn badge-gradient-danger";
      case "Pending":
        return "status-btn badge-gradient-Pending";
      case "In progress":
        return "status-btn badge-gradient-theme";
      case "Submitted":
        return "status-btn badge-gradient-Submitted";
      case "Approved":
        return "status-btn badge-gradient-Approved";
      case "Freeze":
        return "status-btn badge-gradient-Frozen";
      case "Block":
        return "status-btn badge-gradient-Blocked";
      case "Reject":
        return "status-btn badge-gradient-reject";
      case "Disable":
        return "status-btn badge-gradient-disabled";
      default:
        return "status-btn badge-gradient-info";
    }
  };