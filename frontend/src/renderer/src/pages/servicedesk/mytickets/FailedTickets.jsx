import CustomTable from '../../../components/tables/CustomTable'
import { getFilteredColumns } from '../../../utils/helpers'
import { ticketColumns } from '../../../utils/sampleData'
import { tickets } from '../../../utils/generateTickets'

function FailedTickets() {
    return (
        <>
            <div className="card shadow text-center">
                <div className="card-header text-uppercase fw-semibold fs-3 text-light bg-danger">
                    FAILED TICKETS
                </div>
                <div className="card-body">
                    <CustomTable
                        filter="Declined"
                        data={tickets}
                        columns={getFilteredColumns('DECLINED', ticketColumns)}
                    />
                </div>
            </div>
        </>
    )
}
export default FailedTickets
