import React, { useRef, ReactElement, memo, ReactText } from 'react';
import { FlatList, ListRenderItem, ListRenderItemInfo, TouchableOpacity } from 'react-native';
import { DataListView } from '../DataListView';
import { Flex, Box, Text, helpers } from '@td-design/react-native';
import { DataProvider, LayoutProvider } from 'recyclerlistview';
import { useCreation } from '@td-design/rn-hooks';

export enum ContentType {
  TITLE = 'title',
  CONTENT = 'content',
}

type ItemType = { type: ContentType; name: string; [key: string]: unknown };
type LetterType = { name: string; index: number };
export interface IndexBarProps<T extends ItemType = ItemType> {
  data: T[];
  onPress?: (item: T) => void;
  renderItem?: (item: T) => ReactElement;
  renderSectionHeader?: (section: T) => ReactElement;
  ListFooterComponent?: ReactElement;
  renderIndexItem?: ListRenderItem<LetterType>;
  titleHeight?: number;
  itemHeight?: number;
}

const { px, ONE_PIXEL } = helpers;
export function IndexBar<T extends ItemType = ItemType>({
  data = [],
  onPress,
  renderItem,
  renderSectionHeader,
  renderIndexItem,
  ListFooterComponent,
  titleHeight = px(32),
  itemHeight = px(56),
}: IndexBarProps<T>) {
  const listRef = useRef<any>(null);

  const letters = prepareLetters<T>(data);
  const length = useCreation(() => {
    return data.filter(item => item.type === ContentType.CONTENT).length;
  }, []);

  const renderAheadOffset = letters.length * titleHeight + length * itemHeight;

  const renderLayoutProvider = (dataProvider: DataProvider) => {
    return new LayoutProvider(
      (index: number) => {
        const type = dataProvider.getDataForIndex(index).type;
        return type;
      },
      (type, dim) => {
        switch (type) {
          case ContentType.TITLE:
            dim.width = helpers.deviceWidth;
            dim.height = 32;
            break;

          case ContentType.CONTENT:
            dim.width = helpers.deviceWidth;
            dim.height = 56;
            break;

          default:
            dim.width = 0;
            dim.height = 0;
        }
      },
    );
  };

  const rowRenderer = (type: ReactText, data: T) => {
    switch (type) {
      case ContentType.TITLE:
        if (renderSectionHeader) return renderSectionHeader(data);
        return <Title {...data} />;

      case ContentType.CONTENT:
        if (renderItem) return renderItem(data);
        const handlePress = () => {
          onPress?.(data);
        };
        return <IndexItem {...data} onPress={handlePress} />;

      default:
        return null;
    }
  };

  const handleLetterSelect = (item: LetterType) => () => {
    listRef.current?.scrollToIndex(item.index, true);
  };

  const renderLetterItem = (info: ListRenderItemInfo<LetterType>) => {
    if (renderIndexItem) return renderIndexItem(info);

    const { item } = info;
    return (
      <TouchableOpacity key={item.name} onPress={handleLetterSelect(item)}>
        <Box width={px(16)} height={px(20)} borderRadius="x4" justifyContent="center" alignItems="center">
          <Text>{item.name.toUpperCase()}</Text>
        </Box>
      </TouchableOpacity>
    );
  };

  const renderListFooter = () => {
    if (ListFooterComponent) return ListFooterComponent;
    return (
      <Box height={px(56)} justifyContent="center" alignItems="center">
        <Text variant="p1" color="gray500">
          {`${length} 个联系人`}
        </Text>
      </Box>
    );
  };

  return (
    <>
      <DataListView
        ref={listRef}
        data={data}
        keyExtractor={item => item.type.toString() + item.name.toString()}
        itemHeight={140}
        renderLayoutProvider={renderLayoutProvider}
        rowRenderer={rowRenderer}
        renderFooter={renderListFooter}
        renderAheadOffset={renderAheadOffset}
      />
      <FlatList
        data={letters}
        keyExtractor={item => item.name}
        renderItem={renderLetterItem}
        showsVerticalScrollIndicator={false}
        initialNumToRender={26}
        bounces={false}
        style={{
          position: 'absolute',
          top: px(70),
          right: 0,
          height: '100%',
          width: px(40),
        }}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </>
  );
}

const Title = memo((data: ItemType) => {
  return (
    <Box flex={1} backgroundColor="background" justifyContent="center" paddingLeft="x2">
      <Text color="gray500">{data.name.toUpperCase()}</Text>
    </Box>
  );
});

const IndexItem = memo(({ onPress, ...data }: ItemType & { onPress?: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Flex
        width={'100%'}
        height={'100%'}
        alignItems="center"
        paddingLeft="x2"
        borderBottomWidth={ONE_PIXEL}
        borderBottomColor="border"
      >
        <Box
          width={px(40)}
          height={px(40)}
          backgroundColor="primary200"
          justifyContent="center"
          alignItems="center"
          borderRadius="x1"
        >
          <Text variant="h2" color="white">
            {data.name?.substring(0, 1)}
          </Text>
        </Box>
        <Box marginLeft="x2">
          <Text>{data.name}</Text>
        </Box>
      </Flex>
    </TouchableOpacity>
  );
});

function prepareLetters<T extends ItemType>(data: T[]) {
  const result: LetterType[] = [];
  data.forEach((item, index) => {
    if (item.type === ContentType.TITLE) {
      result.push({
        name: item.name,
        index,
      });
    }
  });
  return result;
}
