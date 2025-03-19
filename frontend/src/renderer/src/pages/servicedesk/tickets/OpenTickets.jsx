import CustomTable from '../../../components/tables/CustomTable'
import { ticketColumns } from '../../../utils/sampleData'
import { getFilteredColumns } from '../../../utils/helpers'
import { tickets } from '../../../utils/generateTickets'

function OpenTickets() {
    return (
        <>
            <div className="card shadow text-center w-100">
                <div className="card-header text-uppercase fw-semibold fs-3 text-light bg-info">
                    OPEN TICKETS
                </div>
                <div className="card-body">
                    <CustomTable
                        filter="Assigned"
                        data={tickets}
                        columns={getFilteredColumns('OPEN', ticketColumns)}
                    />
                </div>
            </div>
        </>
    )
}
export default OpenTickets
