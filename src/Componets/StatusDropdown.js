import React from 'react'

const StatusMarker = ({Status}) => {
    function StatusStyling(props) {
    
            switch (Status) {
                case 'Completed':
                    return 'absolute top-3 right-5 p-2 rounded-full border-solid border-2 text-red-600 border-red-600';
                case 'Tracking':
                    return 'absolute top-1 right-1 p-2 rounded-full border-solid border-2 text-yellow-400  border-yellow-400'
                case 'Active':
                    return 'absolute top-1 right-1 p-2 rounded-full border-solid border-2 text-green-400  border-green-400'
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