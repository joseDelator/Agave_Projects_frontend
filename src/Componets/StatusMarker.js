import React from 'react'
// Status Marker on Porject page that shows if project is active completed or tracking
const StatusMarker = ({Status}) => {
    //switch for different styling pending project status
    function StatusStyling(props) {
            switch (Status) {
                case 'Completed':
                    return 'badge badge-error badge-lg badge-outline';
                case 'Tracking':
                    return 'badge badge-warning badge-lg badge-outline'
                case 'Active':
                    return 'badge badge-primary badge-lg badge-outline'
                default:
                    break;
            }
        }
    return (

        <div className={StatusStyling(Status)} >
         {Status}
        </div>
    )
}

export default StatusMarker