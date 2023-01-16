import React from 'react'

const StatusMarker = ({Status}) => {
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