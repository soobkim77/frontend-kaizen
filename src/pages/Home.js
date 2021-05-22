import { connect } from 'react-redux'
import { useEffect } from 'react'
import BoardPrev from '../components/BoardPrev'
import { fetchBoards } from '../redux/actions/fetchBoards'



const Home = (props) => {


    useEffect(()=>{
        props.fetchBoards();
    }, [props.fetchBoards])

    return(
        <div>
            {props.boards.boards ? props.boards.boards.map(board => <BoardPrev board={board} key={board.id}/> ) : null}
            {/* {props.boards.boards.boards.map(board => {
                return <BoardPrev board={board} key={board.id}/>
            })} */}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        boards: state.boards.boards,
        currentBoard: {...state.currentBoard},
        requesting: state.requesting
    }
}

const mapDispatchToProps= (dispatch) => {
    return {
        fetchBoards: () => {
            dispatch(fetchBoards())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)