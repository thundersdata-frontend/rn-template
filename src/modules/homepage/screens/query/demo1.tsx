import { Button, List } from '@td-design/react-native';
import { useSafeState } from '@td-design/rn-hooks';

import { Container } from '@/components/Container';
import { useCustomQuery } from '@/hooks/useCustomQuery';

interface PersonInfo {
  name: string;
  gender: string;
  age: number;
  height: string;
  weight: string;
  maritalStatus: string;
  education: string;
  school: string;
  major: string;
  address: string;
  hometown: string;
  phone: string;
}

function getDetail({ id }: { id: number }): Promise<PersonInfo> {
  console.log(id, 'id');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: '张三',
        gender: '男',
        age: 18,
        height: '180cm',
        weight: '70kg',
        maritalStatus: '未婚',
        education: '本科',
        school: '清华大学',
        major: '计算机科学与技术',
        address: '北京市朝阳区',
        hometown: '河北省石家庄市',
        phone: '13888888888',
      });
    }, 1000);
  });
}

export function GetDetailDemo1() {
  const [id, setId] = useSafeState<number>(0);

  const { data } = useCustomQuery(getDetail, {
    enabled: !!id,
    queryKey: ['getDetail', { id }],
  });

  console.log(data, 'data');

  return (
    <Container>
      <Button
        title="手动请求数据"
        onPress={() => {
          setId(id => id + 1);
        }}
      />
      <List
        header="基本信息"
        items={[
          { title: '姓名', extra: data?.name },
          { title: '性别', extra: data?.gender },
          { title: '年龄', extra: data?.age + '' },
          { title: '身高', extra: data?.height },
          { title: '体重', extra: data?.weight },
          { title: '婚姻状况', extra: data?.maritalStatus },
          { title: '学历', extra: data?.education },
          { title: '毕业院校', extra: data?.school },
          { title: '专业', extra: data?.major },
          { title: '现居地', extra: data?.address },
          { title: '户籍', extra: data?.hometown },
          { title: '联系电话', extra: data?.phone },
        ]}
      />
    </Container>
  );
}
