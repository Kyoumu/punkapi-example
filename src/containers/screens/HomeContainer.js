import { connect } from 'react-redux';
import Home from './../../components/screens/Home';
import { initializeBeerList } from './../../actions/beer';

const mapStateToProps = (state, ownProps) => ({...ownProps});

const mapDispatchToProps = (dispatch) => ({
    initializeBeerList: (queryStr) => {
        dispatch(initializeBeerList(queryStr));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);