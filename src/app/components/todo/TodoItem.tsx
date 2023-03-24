import React from 'react'
import { Todos } from '../../../features/counter/todosSlice';
import Loading from '../Loading';

const TodoItem: React.FC<{ selector: Array<Todos>, status: String }> = ({ selector, status }) => {

    if (status === 'loading') {
        return <div className='d-flex align-items-center justify-content-center'> <Loading /> </div>
    }
    if (status === 'failed') {
        return <div className="row">Some error happened. Try it again later.</div>
    }
    return (
        <>
            {
                selector.length > 0 ? <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">User ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selector.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <th scope="row" >{item.user_id}</th>
                                    <td>{item.title}</td>
                                    <td>{item.due_on}</td>
                                    <td>{item.status}</td>
                                </tr>);
                        })}
                    </tbody>
                </table>
                    : <div className='text-info text-center' style={{ fontSize: '24px' }}> Görüntülenecek Veri Yok </div>
            }
        </>
    )
}
export default TodoItem;