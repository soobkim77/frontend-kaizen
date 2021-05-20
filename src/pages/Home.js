import { connect } from 'react-redux'
import { useEffect } from 'react'
import BoardPrev from '../components/BoardPrev'

const URL = "http://localhost:3000/boards";

const Home = (props) => {

    const fetchBoards = () => {
        let configObj = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        };
        fetch(URL, configObj)
        .then(r => r.json())
        .then(resp => {
            props.getBoards(resp.boards)
        })
    }

    useEffect(()=>{
        fetchBoards();
    }, [])

    return(
        <div>
            {props.boards.boards.map(board => {
                return <BoardPrev board={board} key={board.id}/>
            })}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        boards: state.boards
    }
}

const mapDispatchToProps= (dispatch) => {
    return {
        getBoards: (boards) => {
            dispatch({type: "get-boards", payload: boards})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)