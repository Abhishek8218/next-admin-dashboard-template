"use client";
import { ChartNoAxesColumn, Plus, Search, SlidersHorizontal } from "lucide-react";

import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";

// Interface for table props
interface TableProps {
  data?: Array<Record<string, string | number | boolean>>; // Data is optional
  onRowClick?: (id: string) => void;
  action?: boolean,
  onCreate?:()=>void,
  setDelete?: boolean,
  setEdit?: boolean
  onEdit?:()=>void
  onDelete?:(id:string)=>void
  setDrawer?:boolean,
  drawer?:(id:string)=>void,
  drawerTitle?:string
}
type StatusMap = {
  [key: number | string]: {
    text: string;
    class: string;
  };
};

// Status Badge Component
const StatusBadge: React.FC<{ status: number | string }> = ({ status }) => {
  const statusMap: StatusMap = {
    // General Application Statuses
    "active": { text: "Active", class: "bg-green-100 text-green-700" },
    "inactive": { text: "Inactive", class: "bg-gray-100 text-gray-700" },
    "draft": { text: "Draft", class: "bg-gray-100 text-gray-700" },
    "0": { text: "Application Submitted", class: "bg-gray-100 text-gray-700" },
    "1": { text: "Under Review", class: "bg-blue-100 text-blue-700" },
    "2": { text: "Approved", class: "bg-green-100 text-green-700" },
    "3": {
      text: "Pending Documentation",
      class: "bg-yellow-100 text-yellow-700",
    },
    "4": { text: "Rejected", class: "bg-red-100 text-red-700" },

    // Financial Services Statuses
    "5": { text: "Disbursed", class: "bg-orange-100 text-orange-700" },
    "6": { text: "In Default", class: "bg-purple-100 text-purple-700" },
    "7": { text: "Paid Off", class: "bg-teal-100 text-teal-700" },
    "8": {
      text: "Re-Application Required",
      class: "bg-indigo-100 text-indigo-700",
    },
    "9": { text: "Awaiting Payment", class: "bg-pink-100 text-pink-700" },
    "10": { text: "Renewal Offered", class: "bg-lime-100 text-lime-700" },
    "11": { text: "Closed", class: "bg-cyan-100 text-cyan-700" },
    "12": { text: "Payment Overdue", class: "bg-red-200 text-red-800" },
    "13": { text: "Payment Received", class: "bg-green-200 text-green-800" },

    // Compliance and Investigative Statuses
    "14": { text: "Escalated", class: "bg-yellow-200 text-yellow-800" },
    "15": { text: "Archived", class: "bg-gray-300 text-gray-800" },
    "16": { text: "Under Investigation", class: "bg-slate-100 text-slate-700" },
    "17": { text: "Fraud Alert", class: "bg-red-200 text-red-800" },
    "18": { text: "Data Breach Detected", class: "bg-red-500 text-white" },
    "19": { text: "Compliance Approved", class: "bg-green-300 text-green-900" },

    // Activity Statuses
    "20": { text: "Inactive", class: "bg-gray-100 text-gray-700" },
    "21": { text: "Active", class: "bg-green-100 text-green-700" },
    "22": { text: "Pending", class: "bg-yellow-100 text-yellow-700" },
    "23": { text: "Suspended", class: "bg-red-100 text-red-700" },
    "24": {
      text: "Temporarily Paused",
      class: "bg-orange-300 text-orange-900",
    },

    // Healthcare Statuses
    "25": { text: "Pending Diagnosis", class: "bg-purple-200 text-purple-800" },
    "26": { text: "Treatment Initiated", class: "bg-teal-200 text-teal-800" },
    "27": {
      text: "Follow-Up Required",
      class: "bg-orange-200 text-orange-800",
    },
    "28": { text: "In Recovery", class: "bg-lime-200 text-lime-800" },
    "29": { text: "Discharged", class: "bg-green-200 text-green-800" },
    "30": { text: "Awaiting Test Results", class: "bg-gray-200 text-gray-800" },
    "31": { text: "Referral Sent", class: "bg-blue-200 text-blue-700" },

    // E-Commerce Order Statuses
    "32": { text: "Order Processing", class: "bg-yellow-300 text-yellow-900" },
    "33": { text: "Payment Confirmed", class: "bg-blue-300 text-blue-900" },
    "34": { text: "Shipped", class: "bg-green-300 text-green-900" },
    "35": { text: "Out for Delivery", class: "bg-teal-300 text-teal-900" },
    "36": { text: "Delivered", class: "bg-green-400 text-green-900" },
    "37": { text: "Returned", class: "bg-red-300 text-red-900" },
    "38": { text: "Refund Processed", class: "bg-orange-300 text-orange-900" },
    "39": { text: "Awaiting Restock", class: "bg-indigo-200 text-indigo-800" },
    "40": { text: "Order Cancelled", class: "bg-red-500 text-white" },

    // Project Management Statuses
    "41": { text: "Planning", class: "bg-gray-400 text-gray-900" },
    "42": { text: "In Progress", class: "bg-blue-400 text-blue-900" },
    "43": { text: "On Hold", class: "bg-yellow-400 text-yellow-900" },
    "44": { text: "Completed", class: "bg-green-400 text-green-900" },
    "45": { text: "Cancelled", class: "bg-red-400 text-red-900" },
    "46": { text: "Review Needed", class: "bg-purple-300 text-purple-900" },
    "47": { text: "Feedback Required", class: "bg-orange-300 text-orange-800" },
    "48": {
      text: "Final Approval Pending",
      class: "bg-lime-200 text-lime-900",
    },

    // IT Services Statuses
    "49": { text: "Under Maintenance", class: "bg-orange-300 text-orange-900" },
    "50": { text: "Update Available", class: "bg-indigo-300 text-indigo-900" },
    "51": { text: "Service Interruption", class: "bg-red-400 text-red-900" },
    "52": { text: "Deployment Scheduled", class: "bg-blue-300 text-blue-900" },
    "53": { text: "Monitoring", class: "bg-gray-200 text-gray-800" },
    "54": { text: "Scheduled Downtime", class: "bg-yellow-500 text-white" },

    // Education Statuses
    "55": { text: "Enrollment Open", class: "bg-green-100 text-green-700" },
    "56": { text: "Classes in Session", class: "bg-blue-200 text-blue-700" },
    "57": { text: "Graduated", class: "bg-lime-200 text-lime-700" },
    "58": { text: "Dropped Out", class: "bg-red-200 text-red-700" },
    "59": {
      text: "Pending Approval for Course",
      class: "bg-yellow-200 text-yellow-700",
    },
    "60": {
      text: "Certification Pending",
      class: "bg-purple-300 text-purple-800",
    },

    // Logistics and Transportation Statuses
    "61": { text: "Scheduled", class: "bg-teal-100 text-teal-700" },
    "62": { text: "In Transit", class: "bg-blue-200 text-blue-700" },
    "63": { text: "Delayed", class: "bg-orange-200 text-orange-700" },
    "64": { text: "Arrived", class: "bg-green-200 text-green-700" },
    "65": { text: "Canceled", class: "bg-red-300 text-red-700" },
    "66": {
      text: "Waiting for Pickup",
      class: "bg-yellow-300 text-yellow-700",
    },
    "67": { text: "Delivery Completed", class: "bg-teal-300 text-teal-800" },

    // Manufacturing Statuses
    "68": { text: "Production Scheduled", class: "bg-lime-100 text-lime-700" },
    "69": { text: "In Production", class: "bg-blue-100 text-blue-700" },
    "70": { text: "Quality Check", class: "bg-purple-200 text-purple-700" },
    "71": { text: "Ready for Shipment", class: "bg-teal-100 text-teal-700" },
    "72": { text: "Shipped", class: "bg-green-100 text-green-700" },
    "73": { text: "Awaiting Parts", class: "bg-yellow-200 text-yellow-700" },

    // Marketing Statuses
    "74": { text: "Campaign Planning", class: "bg-gray-300 text-gray-700" },
    "75": { text: "Campaign Running", class: "bg-blue-200 text-blue-700" },
    "76": {
      text: "Performance Analysis",
      class: "bg-yellow-300 text-yellow-700",
    },
    "77": { text: "Campaign Closed", class: "bg-green-200 text-green-700" },
    "78": { text: "Feedback Received", class: "bg-purple-200 text-purple-700" },
    "79": {
      text: "Follow-Up Required",
      class: "bg-orange-200 text-orange-700",
    },
  };

  const { text, class: colorClass } = statusMap[status] || {
    text: "Unknown Status",
    class: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full select-none ${colorClass}`}
    >
      {text}
    </span>
  );
};

export const Table: React.FC<TableProps> = ({ data = [], onRowClick, action, onCreate,setDelete,setEdit=true,onDelete,drawer,drawerTitle,setDrawer }) => {
  const router = useRouter();
  // const [editId, setEditId] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);

  const headers = useMemo(
    () => (data.length ? Object.keys(data[0]) : []),
    [data]
  );

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const requestSort = (key: string) => {
    setSortConfig((prev) =>
      prev && prev.key === key && prev.direction === "ascending"
        ? { key, direction: "descending" }
        : { key, direction: "ascending" }
    );
  };

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 inline ml-2 transition-transform duration-300 transform hover:scale-110"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={
            sortConfig.direction === "ascending"
              ? "M5 15l7-7 7 7"
              : "M19 9l-7 7-7-7"
          }
        />
      </svg>
    );
  };

  const handleRowClick = (row: Record<string, string | number | boolean>) => {
    const firstKey = Object.keys(row)[0]; // Get the first key from the row object
    const firstKeyValue = row[firstKey] as string; // Ensure the value is treated as a string

    if (onRowClick) {
      onRowClick(firstKeyValue); // Pass the first key's value directly as a string
    }
  };

const handleEditClick = (row: Record<string, string | number | boolean>) => {

 const firstKey = Object.keys(row)[0]; // Get the first key from the row object
    const firstKeyValue = row[firstKey] as string; // Ensure the value is treated as a string

        console.log("firstKeyValue", firstKeyValue);     
  // Get the current path using window.location.pathname
  const currentPath = window.location.pathname;
  console.log("row", row);
  // Replace the last part of the URL with "/create/edit"
  const newUrl =   currentPath +  "/edit/"  + firstKeyValue
  
  // Use router.replace to update the URL without reloading the page
  router.replace(newUrl);
          console.log("Edit clicked for row:", row);

}

  return (
    <div className="max-w-full overflow-hidden border-x  ">
      <div className="flex flex-row items-center justify-between p-4 w-full h-fit">
        {/* Search Input + Filter */}
        <div className="w-2/4 flex flex-row items-center gap-4">
          {/* Filter Icon and Text */}
          <button className="flex items-center gap-1 cursor-pointer text-gray-600">
            <ChartNoAxesColumn size={20} color="#1d4ed8" strokeWidth={1.75} />
            <p className="text-sm">Stats</p>
          </button>
          {/* Filter Icon and Text */}
          <button className="flex items-center gap-1 cursor-pointer text-gray-600">
            <SlidersHorizontal size={18} color="#1d4ed8" strokeWidth={1.75} />
            <p className="text-sm">Filter</p>
          </button>
          {/* Search Input */}
          <div className="w-full relative">
            <input
              className="
          w-full
          pl-8 pr-2 py-1
          outline-none 
          ring-2 
          ring-gray-300 
          focus:ring-2 
          focus:ring-blue-500 
          rounded-md
          transition-all 
          duration-200 
          ease-in-out 
          hover:ring-gray-300 
          bg-white
          text-gray-700
          placeholder-gray-400
        "
              placeholder="Search"
              type="text"

            />
            <div className="absolute inset-y-0 left-2 flex items-center">
              <Search size={16} color="#9ca3af" strokeWidth={1.75} />
            </div>
          </div>
        </div>

        {/* Button */}
        <div>
          <button onClick={onCreate} className="flex items-center justify-center py-2 px-2 bg-blue-700 rounded-md text-white w-[100px] text-sm space-x-2">
            <Plus size={16} color="#ffffff" strokeWidth={1.75} />
            <span>Create</span>
          </button>
        </div>
      </div>
      <div className="overflow-auto h-[calc(100vh-170px)]">
        <table className="min-w-full border-collapse bg-white">
          <thead className="bg-gray-100 sticky top-0 z-10 border-y border-gray-300">
            <tr>
              {headers.length > 0 ? (
                headers.map((header) => (
                  <th
                    key={header}
                    onClick={() => requestSort(header)}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-800 capitalize tracking-wider cursor-pointer hover:bg-gray-200 transition-colors duration-200 border-b border-gray-300"
                  >
                    {header.replace(/_/g, " ")}
                    {getSortIcon(header)}
                  </th>
                ))
              ) : (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider border-b border-gray-300">
                  No Data
                </th>
              )}
              {action && <th className="px-6 py-3 text-left text-xs font-medium text-gray-950 capitalize tracking-wider sticky right-0 bg-gray-100 rounded-r-lg border-b border-gray-300">
                Actions
              </th>}
            </tr>
          </thead>

          <tbody className="bg-white">
            {sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => handleRowClick(row)}
                className="transition duration-300 hover:bg-gray-100 hover:text-gray-900 cursor-pointer border-b border-gray-300"
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    title={String(row[header])}
                    className="text-ellipsis overflow-hidden px-6 py-2.5 text-sm text-gray-500 truncate border-b border-gray-300"
                  >
                   {header === "status" ? (
  typeof row[header] === 'string' || typeof row[header] === 'number' ? (
    <StatusBadge status={row[header]} />
  ) : (
    <span>{row[header]}</span>
  )
) : header === "image" ? (
  <img
    src={typeof row[header] === 'string' ? row[header] : ''}
    alt="Profile Picture"
    width={40} // You can adjust the size
    height={40}
    className="rounded-full" // For a rounded profile picture
  />
) : (
  <span>{row[header]}</span>
)}


                   
                  </td>
                ))}
                {action && <td className="px-6 py-2.5 space-x-2 text-sm text-gray-500 whitespace-nowrap sticky right-0 bg-white border-b border-gray-300">
                  { setDrawer && <button
                    className=" text-green-500 hover:text-green-700 transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click event
                      console.log("Drawer clicked for row:", row);
                      if (drawer) {
                        console.log("row.id", row._id);
                        drawer(row._id as string);  
                      }
                    }}
                  >
                    {drawerTitle}
                  </button>}

{   setEdit &&               <button
                    className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleEditClick(row);
                    }}
                  >
                    Edit
                  </button>}
                 { setDelete && <button
                    className="ml-2 text-red-500 hover:text-red-700 transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click event
                      console.log("Delete clicked for row:", row);
                      if (onDelete) {
                        onDelete(row._id as string);
                        console.log("row.id", row._id);
                      }
                    }}
                  >
                    Delete
                  </button>}

               
                </td>
}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
  
    </div>
  );
};
