import { connect } from 'react-redux';
import Home from './../../components/screens/Home';
import { initializeBeerList } from './../../actions/beer';
import { goToNextPage } from './../../actions/pagination';

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    isInfiniteScroll: state.options.isInfiniteScroll
});

const mapDispatchToProps = (dispatch) => ({
    initializeBeerList: (queryStr) => {
        dispatch(initializeBeerList(queryStr));
    },
    setInfiniteScrollAvailability: (isEnabled, queryStr) => {
        if (isEnabled) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset === (document.documentElement.scrollHeight - document.documentElement.clientHeight)) {
                    console.log('infiniteScroll', queryStr);

                    dispatch(goToNextPage(queryStr));
                }
            });
        } else {
            // window.removeEventListener('scroll');
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);