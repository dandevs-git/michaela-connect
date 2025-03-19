import CustomTable from '../components/tables/CustomTable'
import { users } from '../utils/generateUsers'
import { userColumns } from '../utils/sampleData'
function Employees() {
    const topContent = <div className="btn btn-primary me-4">+ New User</div>
    return (
        <>
            <div className="card shadow text-center w-100">
                <div className="card-header text-uppercase fw-semibold fs-3 text-light bg-primary">
                    EMPLOYEE MANAGEMENT
                </div>
                <div className="card-body">
                    <CustomTable topContent={topContent} data={users} columns={userColumns} />
                </div>
            </div>
        </>
    )
}
export default Employees
