import CustomTable from '../../../components/tables/CustomTable'
import { getFilteredColumns } from '../../../utils/helpers'
import { ticketColumns } from '../../../utils/sampleData'
import { tickets } from '../../../utils/generateTickets'

function ClosedTickets() {
    return (
        <>
            <div className="card shadow text-center">
                <div className="card-header text-uppercase fw-semibold fs-3 text-light bg-success">
                    CLOSED TICKETS
                </div>
                <div className="card-body">
                    <CustomTable
                        filter="Done"
                        data={tickets}
                        columns={getFilteredColumns('CLOSED', ticketColumns)}
                    />
                </div>
            </div>
        </>
    )
}
export default ClosedTickets
