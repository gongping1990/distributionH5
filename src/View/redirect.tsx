import React from 'react';
import qs from 'querystring';

enum ESystem {
  POEM = '1', // (1,"poem","每日一首古诗词")
  COMPOSITION = '2' //(2,"composition","小语轻作文")
}
interface Props {
  location: any;
  history: any;
}
const redirect: React.FC<Props> = props => {
  let userInfo = localStorage.getItem('userInfo');
  let search = props.location.search.replace(/^\?/, '');
  let query = qs.parse(search);
  let mode = query.mode || '0';
  let params = {
    inviteCode: query.inviteCode,
    type: query.type || '0'
  } as any;

  query.id && (params.groupOrderId = query.id);
  query.courseId && (params.courseId = query.courseId);
  alert(userInfo);
  if (userInfo) {
    if (query.id) {
      props.history.replace(
        `/group?id=${query.id}&type=${query.type}&courseId=${query.courseId}`
      );
    } else {
      props.history.replace('/');
    }
  } else {
    switch (mode) {
      case ESystem.POEM:
        window.location.href =
          'http://poem.test.k12.vip/newDetail?' + qs.stringify(params);
        break;
    }
  }

  return <div></div>;
};

export default redirect;
