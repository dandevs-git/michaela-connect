import CustomTable from '../../components/tables/CustomTable'
import { tickets } from '../../utils/generateTickets'
import { userActivitycolumns } from '../../utils/sampleData'

function Activities() {
    return (
        <>
            <div className="col-xl-12 m-0 p-4">
                <CustomTable data={tickets} columns={userActivitycolumns} />
            </div>
        </>
    )
}
export default Activities
