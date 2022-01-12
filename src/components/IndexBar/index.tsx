import React, { useRef, ReactElement, memo } from 'react';
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  Platform,
  SectionList,
  SectionListData,
  SectionListProps,
  SectionListRenderItemInfo,
  TouchableOpacity,
} from 'react-native';
import { Flex, Box, Text, helpers, Empty } from '@td-design/react-native';

export enum ContentType {
  TITLE = 'title',
  CONTENT = 'content',
}

type LetterType = { name: string; index: number };
type ItemType = { name: string; [key: string]: unknown };
type SectionType = { title: string };

export interface IndexBarProps<T, R>
  extends Pick<
    SectionListProps<T, R>,
    'sections' | 'windowSize' | 'initialNumToRender' | 'maxToRenderPerBatch' | 'updateCellsBatchingPeriod'
  > {
  renderItem?: (item: T) => ReactElement;
  renderSectionHeader?: (section: R) => ReactElement;
  renderFooter?: () => ReactElement;
  renderIndexItem?: ListRenderItem<LetterType>;
  titleHeight?: number;
  itemHeight?: number;
}

const { px, ONE_PIXEL } = helpers;
export function IndexBar<T extends ItemType = ItemType, R extends SectionType = SectionType>({
  sections = [],
  titleHeight = px(32),
  itemHeight = px(56),
  windowSize,
  initialNumToRender,
  maxToRenderPerBatch,
  updateCellsBatchingPeriod,
  ...props
}: IndexBarProps<T, R>) {
  const listRef = useRef<SectionList<T, R>>(null);

  // performance optimization props
  const _windowSize = 50;
  const _initialNumToRender = 150;
  const _maxToRenderPerBatch = 150;
  const _updateCellsBatchingPeriod = 50;

  const renderSectionItem = (info: SectionListRenderItemInfo<T, R>) => {
    if (props.renderItem) return props.renderItem(info.item);
    return <IndexItem name={info.item.name} height={itemHeight} />;
  };

  const renderSectionHeader = ({ section }: { section: SectionListData<T, R> }) => {
    if (props.renderSectionHeader) return props.renderSectionHeader(section);
    return <SectionHeader height={titleHeight} {...section} />;
  };

  const renderSectionFooter = () => {
    if (sections.length === 0) return null;
    if (props.renderFooter) return props.renderFooter();

    const count = sections.reduce((accu, curr) => accu + curr.data.length, 0);
    return <SectionFooter count={count} />;
  };

  const renderSectionEmpty = () => <Empty isEmpty emptyText="暂无数据" />;

  const letters = sections.map((item, index) => ({ name: item.title, index }));
  const handleLetterSelect = (item: LetterType) => () => {
    listRef.current?.scrollToLocation({ itemIndex: 0, sectionIndex: item.index, animated: false });
  };
  const renderLetterItem = (info: ListRenderItemInfo<LetterType>) => {
    if (props.renderIndexItem) return props.renderIndexItem(info);

    const { item } = info;
    return (
      <TouchableOpacity key={item.name} onPress={handleLetterSelect(item)}>
        <Box width={px(16)} height={px(20)} borderRadius="x4" justifyContent="center" alignItems="center">
          <Text>{item.name.toUpperCase()}</Text>
        </Box>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SectionList
        ref={listRef}
        keyExtractor={item => item.name}
        sections={sections}
        renderItem={renderSectionItem}
        renderSectionHeader={renderSectionHeader}
        ListEmptyComponent={renderSectionEmpty}
        ListFooterComponent={renderSectionFooter}
        getItemLayout={(_, index) => ({ length: itemHeight, offset: itemHeight * index, index })}
        windowSize={windowSize ?? _windowSize}
        initialNumToRender={initialNumToRender ?? _initialNumToRender}
        maxToRenderPerBatch={maxToRenderPerBatch ?? _maxToRenderPerBatch}
        updateCellsBatchingPeriod={updateCellsBatchingPeriod ?? _updateCellsBatchingPeriod}
        stickySectionHeadersEnabled
        removeClippedSubviews={Platform.OS === 'android'}
        contentContainerStyle={sections.length > 0 ? {} : { flex: 1 }}
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

const SectionHeader = memo(({ title, height }: { title: string; height: number }) => {
  return (
    <Box height={height} backgroundColor="background" justifyContent="center" paddingLeft="x2">
      <Text color="gray500">{title.toUpperCase()}</Text>
    </Box>
  );
});

const SectionFooter = memo(({ count }: { count: number }) => {
  return (
    <Flex width="100%" height={helpers.px(49)} justifyContent="center" alignItems="center">
      <Text>共 {count} 条记录</Text>
    </Flex>
  );
});

const IndexItem = memo(({ name, height }: { name: string; height: number }) => {
  return (
    <Flex
      width={'100%'}
      height={height}
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
          {name.substring(0, 1)}
        </Text>
      </Box>
      <Box marginLeft="x2">
        <Text>{name}</Text>
      </Box>
    </Flex>
  );
});
