/* eslint-disable react/destructuring-assignment */
import React, {Fragment} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ZipCodeItem from './ZipCodeItem';
import SearchArea from './SearchArea';
import Preloader from './Preloader';
import LangFlags from './LangFlags';
// import cities from '../api/mocks/cities';
import '../styles/index.scss';
import ErrorBoundary from '../HOCs/ErrorBoundary';
import {
  changeFetchingState,
  changeCurrentItem,
  changeErrorValue,
  changeSearchValue,
  changeZIPCodes,
  setInitialState,
  getNewData,
} from '../state/reducers/items/index';

class ZiPCodeComponent extends React.Component {
  // state = {
  //   currentItem: {},
  //   searchValue: '',
  //   searchError: '',
  //   isFetching: false,
  //   zipCodeItems: cities || [],
  // };

  // input handler
  handleChangeSearch = event => {
    const target = event.target.value;
    const regExp = new RegExp('^\\d+$');

    // maximum 5 characters
    if (target.length > 5) {
      return;
    }

    // type only numbers
    if (regExp.test(target) || target === '') {
      this.props.changeSearchValue(target);
      // this.setState({searchValue: target});
    } else {
      this.props.changeErrorValue('Please type only numbers');
      // this.setState({searchError: 'Please type only numbers'});
      return;
    }

    // notification to user about not correct input
    if (target.length !== 5 && target.length !== 0) {
      this.props.changeErrorValue('Please type 5-digit code');
      // this.setState({searchError: 'Please type 5-digit code'});
    } else {
      this.props.changeErrorValue('');
      // this.setState({searchError: ''});
    }
  };

  removeItem = (ev, el) => {
    ev.stopPropagation();
    this.props.changeZIPCodes(
      this.props.itemReducer.zipCodeItems.filter(item => el._id !== item._id),
    );
    this.props.changeCurrentItem({});
    // this.setState((prevState /* props */) => ({
    // zipCodeItems: prevState.zipCodeItems.filter(item => el._id !== item._id),
    // currentItem: {},
    // }));
  };

  selectItem = replyItem => {
    // check item, selected or not
    const isAlreadySelected =
      this.props.itemReducer.currentItem['post code'] === replyItem['post code'];

    if (isAlreadySelected) {
      this.props.setInitialState();
      // this.setState({
      //   currentItem: {},
      //   searchValue: '',
      //   searchError: '',
      // });
    } else {
      this.props.changeCurrentItem(replyItem);
      this.props.changeSearchValue(replyItem['post code']);
      // this.setState({
      //   currentItem: replyItem,
      //   searchValue: replyItem['post code'],
      // });
    }
  };

  searchHandlerEnter = e => {
    if (e.key === 'Enter') {
      this.searchHandler();
    }
  };

  searchHandler = () => {
    // fire search only if input has correct zip code
    if (this.props.itemReducer.searchValue.length === 5) {
      this.getNewData();
    }
  };

  getNewData = () => {
    this.props.getNewData();
  };

  // getNewData = async () => {
  //   const {isFetching, zipCodeItems, searchValue, currentItem} = this.props.itemReducer;
  //   // prevent fetching new data if user are fetching data now
  //   if (!isFetching) {
  //     // this.setState({isFetching: true});
  //     this.props.changeFetchingState(true);
  //     try {
  //       const result = await axios({
  //         method: 'get',
  //         url: `https://api.zippopotam.us/us/${searchValue}`,
  //       });
  //
  //       // if application has correct response
  //       if (result.status === 200) {
  //         const isPostCodeExists = zipCodeItems.some(
  //           el => el['post code'] === result.data['post code'],
  //         );
  //
  //         let newData = [].concat([], zipCodeItems);
  //         // create or change exists item
  //         if (!isPostCodeExists) {
  //           if (!currentItem._id) {
  //             // create new item
  //             newData = [].concat(zipCodeItems, {...result.data, _id: generateUniqueId()});
  //           } else {
  //             // update exists item
  //             newData = zipCodeItems.map(el =>
  //               el._id === currentItem._id ? {...result.data, _id: currentItem._id} : el,
  //             );
  //           }
  //         }
  //
  //         // generate error text for user
  //         let searchError = '';
  //         if (isPostCodeExists) {
  //           searchError = 'Post code already exists';
  //         }
  //
  //         this.setState({
  //           isFetching: false,
  //           searchValue: '',
  //           searchError: searchError,
  //           zipCodeItems: newData,
  //         });
  //       } else {
  //         this.setState({isFetching: false, searchError: 'Something wrong with connection!'});
  //       }
  //     } catch (er) {
  //       console.log(er.response || er);
  //       let searchError = '';
  //       if (er.response && er.response.data && er.response.data['post code'] === undefined) {
  //         searchError = "Post code wasn't found";
  //       }
  //       this.setState({isFetching: false, searchError});
  //     }
  //   }
  // };

  render() {
    const {
      zipCodeItems,
      currentItem,
      searchError,
      searchValue,
      isFetching,
    } = this.props.itemReducer; // this.state
    return (
      <Fragment>
        <ErrorBoundary>
          <LangFlags />
        </ErrorBoundary>
        <div className="zipCodeCont">
          <div className="zipCodeCont_body">
            <div className="zipCodeCont_body_list">
              <div className="zipCodeCont_body_list_searchErrors">
                {searchError.length ? <span>{searchError}</span> : null}
              </div>
              <div className="zipCodeCont_body_list_search_container_wrapper">
                <SearchArea
                  searchValue={searchValue}
                  handleChangeSearch={this.handleChangeSearch}
                  searchHandlerEnter={this.searchHandlerEnter}
                />
                <div
                  className="zipCodeCont_body_list_search_container_wrapper_btn"
                  onClick={this.searchHandler}
                >
                  <span>Go</span>
                </div>
              </div>

              {(zipCodeItems && zipCodeItems.length) || isFetching ? (
                <div className="zipCodeCont_body_list_items_container scrollStylesRD">
                  {isFetching ? (
                    <div className="zipCodeCont_body_list_items_container_preloader">
                      <Preloader height="24px" />
                    </div>
                  ) : null}

                  {zipCodeItems.map(el => (
                    <ZipCodeItem
                      key={el['post code']}
                      el={el}
                      currentItem={currentItem}
                      selectItem={this.selectItem}
                      removeItem={this.removeItem}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

// export default ZiPCodeComponent;

const mapStateToProps = state => ({
  itemReducer: state.itemReducer,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeFetchingState: stateBool => changeFetchingState(stateBool),
      changeSearchValue: searchString => changeSearchValue(searchString),
      changeErrorValue: errorString => changeErrorValue(errorString),
      changeZIPCodes: codesArray => changeZIPCodes(codesArray),
      changeCurrentItem: currentItemObject => changeCurrentItem(currentItemObject),
      setInitialState: () => setInitialState(),
      getNewData: () => getNewData(dispatch),
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ZiPCodeComponent);
