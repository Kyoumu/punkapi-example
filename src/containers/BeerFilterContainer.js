import { connect } from 'react-redux';
import BeerFilter from './../components/BeerFilter';
import { setItemPerPage, setMinABV, setMaxABV } from './../actions/filter';

const mapStateToProps = (state) => ({
    itemsPerPage: state.filter.itemsPerPage,
    minABV: state.filter.minABV,
    maxABV: state.filter.maxABV
});

const mapDispatchToProps = (dispatch) => ({
    setItemPerPage: (selected) => {
        dispatch(setItemPerPage(selected.value));
    },
    changeABV: ([min, max]) => {
        dispatch(setMinABV(min));
        dispatch(setMaxABV(max));
    },
    changeMinABV: (e) => {
        dispatch(setMinABV(e.target.value));
    },
    changeMaxABV: (e) => {
        dispatch(setMaxABV(e.target.value));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BeerFilter);