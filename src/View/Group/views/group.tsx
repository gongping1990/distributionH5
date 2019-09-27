import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'querystring';
import { components } from '@/View/Home';
import { ICourse, IOrder } from '../type';
import { reWexin } from '@/utils';
import api from '@/request/api';
import Header from '../component/header';
import Content from '../component/content';
import styles from '../styles/index.module.scss';

const { Mask } = components;
// enum ESystem {
//   POEM = 7, // (7,"poem","每日一首古诗词")
//   COMPOSITION = 8 //(8,"composition","小语轻作文")
// }

enum IType {
  WAIT,
  ERROR,
  SUCCESS
}

interface Props {
  history: any;
  location: any;
  user: any;
}

interface State {
  showMask: boolean;
  id: string;
  type: string;
  courseId: string;
  orderData: {
    courseInfo: ICourse;
    groupOrders: IOrder[];
    groupEndTime: string;
    groupOrderStatus: number;
    income: number;
  };
  downTime: string;
}

class Group extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let search: string = this.props.location.search.replace(/^\?/, '');
    let query = qs.parse(search);
    this.state = {
      showMask: false,
      courseId: (query.courseId as string) || '',
      id: (query.id as string) || '',
      type: (query.type as string) || '',
      orderData: {
        groupOrders: [],
        courseInfo: {
          alonePrice: 0,
          buyCount: 0,
          coverphoto: '',
          desc: '',
          groupPrice: 0,
          id: '',
          name: ''
        },
        groupEndTime: '',
        groupOrderStatus: 0,
        income: 0
      },
      downTime: ''
    };
  }

  componentDidMount() {
    document.title = '拼团详情';
    this.init();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.id !== prevState.id) {
      this.init();
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    console.log(nextProps);
    let search: string = nextProps.location.search.replace(/^\?/, '');
    let query = qs.parse(search);
    this.setState({
      courseId: (query.courseId as string) || '',
      id: (query.id as string) || '',
      type: (query.type as string) || ''
    });
  }

  init() {
    this.getGroupOrderDetails();
  }

  getGroupOrderDetails() {
    let { courseId, id } = this.state;
    api.distributie
      .getGroupOrderDetails({
        courseId,
        id
      })
      .then(({ data }) => {
        if (data.resultData.reaminGroupCount) {
          this.TimeDown(data.resultData.groupEndTime);
        }
        if (data.resultData.reaminGroupCount) {
          for (
            let index = 0;
            index < data.resultData.reaminGroupCount;
            index++
          ) {
            data.resultData.groupOrders.push({
              headimgurl: '',
              id: '',
              nickName: '',
              userId: '',
              vatural: false
            });
          }
        }
        this.setState(
          {
            orderData: data.resultData
          },
          () => {
            this.reWexin();
          }
        );
      });
  }

  createGroup() {
    api.distributie
      .createGroup({
        courseId: this.state.courseId
      })
      .then(({ data }) => {
        this.props.history.replace(
          `/group?id=${data.resultData.orderId}&type=${data.resultData.bizSystem}&courseId=${data.resultData.courseId}`
        );
      });
  }

  onClick = (type: number) => {
    let { WAIT, ERROR, SUCCESS } = IType;
    switch (type) {
      case WAIT:
        this.setState({
          showMask: true
        });
        break;
      case ERROR:
        break;
      case SUCCESS:
        this.createGroup();
    }
  };

  TimeDown(endTime: string) {
    let endDateStr = Number(endTime);
    //结束时间
    var endDate = new Date(endDateStr).getTime();
    //当前时间
    var nowDate = new Date().getTime();
    //相差的总秒数
    var totalSeconds: number = parseInt(String((endDate - nowDate) / 1000));
    //小时数
    var hours: any = Math.floor(totalSeconds / (60 * 60));
    var modulo: any = totalSeconds % (60 * 60);
    hours = hours < 10 ? '0' + hours : hours;
    //分钟
    var minutes: any = Math.floor(modulo / 60);
    minutes = minutes < 10 ? '0' + minutes : minutes;
    //秒
    var seconds: any = modulo % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    //输出到页面

    this.setState({
      downTime: ` ${hours}:${minutes}:${seconds} `
    });
    //延迟一秒执行自己
    setTimeout(() => {
      if (totalSeconds > 0) {
        this.TimeDown(endTime);
      } else {
        this.setState({
          downTime: ''
        });
      }
    }, 1000);
  }

  reWexin() {
    let { id, type, orderData } = this.state;
    let order: any = orderData;
    reWexin({
      title: order.groupbtitle,
      doc: order.groupstitle,
      url: `${window.location.origin}/redirect?id=${id}&mode=${type}&inviteCode=${this.props.user.inviteCode}&type=1`,
      img: order.groupimgurl
    });
  }

  render() {
    let { downTime, showMask } = this.state;
    let { headimgurl } = this.props.user;
    let {
      courseInfo,
      groupEndTime,
      groupOrderStatus,
      income,
      groupOrders
    } = this.state.orderData;
    return (
      <div className="container">
        {showMask && (
          <Mask
            onClick={() => {
              this.setState({
                showMask: false
              });
            }}
          ></Mask>
        )}
        <Header {...courseInfo}></Header>
        <div className={styles.content}>
          <p className={styles.title}>开团邀请说明</p>
          <p className={styles.subtitle}>
            该功能是指，您可以通过开团的方式邀请用户购买课程，成
            团后可获得相应的收益，而不是购买此课程
          </p>
          <Content
            reaminGroupCount={1}
            headimgurl={headimgurl}
            downTime={downTime}
            endTime={groupEndTime}
            groupOrderStatus={groupOrderStatus}
            income={income}
            onClick={this.onClick}
            groupOrders={groupOrders}
          ></Content>
          <p className={styles.title}>开团邀请流程</p>
          <div className={styles.step}>
            <div className={styles.item}>
              <p>
                <i>1</i>
                开团
              </p>
            </div>
            <div className={styles.item}>
              <p>
                <i>2</i>
                邀请好友
              </p>
            </div>
            <div className={styles.item}>
              <p>
                <i>3</i>
                满员拼团成功
              </p>
              <span>(不满自动退款)</span>
            </div>
            <div className={styles.item}>
              <p>
                <i>4</i>
                获得收益
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Group);
