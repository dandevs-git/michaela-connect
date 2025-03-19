import CustomTable from '../../../components/tables/CustomTable'
import { getFilteredColumns } from '../../../utils/helpers'
import { ticketColumns } from '../../../utils/sampleData'
import { tickets } from '../../../utils/generateTickets'

function UnassignedTickets() {
    return (
        <>
            <div className="card shadow text-center">
                <div className="card-header text-uppercase fw-semibold fs-3 text-light bg-primary">
                    UNASSIGNED TICKETS
                </div>
                <div className="card-body">
                    <CustomTable
                        filter="Pending"
                        data={tickets}
                        columns={getFilteredColumns('UNASSIGNED', ticketColumns)}
                    />
                </div>
            </div>
        </>
    )
}
export default UnassignedTickets
