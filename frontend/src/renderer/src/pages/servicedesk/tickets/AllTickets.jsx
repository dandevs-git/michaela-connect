import CustomTable from '../../../components/tables/CustomTable'
import { tickets } from '../../../utils/generateTickets'
import { getFilteredColumns } from '../../../utils/helpers'
import { ticketColumns } from '../../../utils/sampleData'

function AllTickets() {
    return (
        <>
            <div className="card shadow text-center">
                <div className="card-header text-uppercase fw-semibold fs-3">ALL Tickets</div>
                <div className="card-body">
                    <CustomTable
                        data={tickets}
                        columns={getFilteredColumns('ALL', ticketColumns)}
                    />
                </div>
            </div>
        </>
    )
}
export default AllTickets
