import { connect } from 'react-redux';
import BeerPaginator from './../components/BeerPaginator';
import { goToNextPage } from './../actions/paginator';

const mapStateToProps = (state) => ({
    isEnabled: state.paginator.isEnabled
});

const mapDispatchToProps = (dispatch) => ({
    goToNextPage: () => {
        dispatch(goToNextPage());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BeerPaginator);