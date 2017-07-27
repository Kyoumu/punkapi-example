import { connect } from 'react-redux';
import Home from './../../components/screens/Home';
import { requestInitializeBeerList } from './../../actions/beer';
import { goToNextPage } from './../../actions/pagination';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    isInfiniteScroll: state.options.isInfiniteScroll
});

const mapDispatchToProps = (dispatch) => ({
    requestInitializeBeerList: (queryStr) => {
        dispatch(requestInitializeBeerList(queryStr));
    },
    enableInfiniteScroll: (queryStr) => {
        const event = () => {
            if (window.pageYOffset === (document.documentElement.scrollHeight - document.documentElement.clientHeight)) {
                dispatch(goToNextPage(queryStr));
            }
        };
        window.addEventListener('scroll', event);

        return event;
    },
    disableInfiniteScroll: (event) => {
        if (event) {
            window.removeEventListener('scroll', event);
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);