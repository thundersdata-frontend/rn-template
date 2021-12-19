import React, { useRef, ReactElement, ReactText } from 'react';
import { FlatList, ListRenderItem, ListRenderItemInfo, TouchableOpacity } from 'react-native';
import { IndexPath, LargeList } from 'react-native-largelist';
import { Flex, Box, Text, helpers } from '@td-design/react-native';
import { useCreation } from '@td-design/rn-hooks';

export interface Section {
  title: string;
  items: SectionData[];
}
export interface SectionData extends Record<string, ReactText> {
  name: string;
}
export interface IndexBarProps {
  data: Section[];
  onPress?: (item: SectionData) => void;
  renderItem?: (item: SectionData) => ReactElement;
  renderSectionHeader?: (section: Section) => ReactElement;
  ListFooterComponent?: ReactElement;
  renderIndexItem?: ListRenderItem<string>;
}

const { px, ONE_PIXEL } = helpers;
export function IndexBar({
  data = [],
  onPress,
  renderItem,
  renderSectionHeader,
  renderIndexItem,
  ListFooterComponent,
  ...rest
}: IndexBarProps) {
  const listRef = useRef<LargeList>(null);

  const { letters = [], length = 0 } = useCreation(() => {
    const letters: string[] = [];
    let length = 0;

    data.forEach(section => {
      letters.push(section.title);
      length += section.items.length;
    });

    return {
      letters,
      length,
    };
  }, [data]);

  const handleLetterSelect = (title: string) => () => {
    const section = data.findIndex(item => item.title === title);
    if (section < 0) return;

    listRef.current?.scrollToIndexPath({
      section,
      row: -1,
    });
  };

  const _renderSection = (sectionIndex: number) => {
    const section = data[sectionIndex];
    if (renderSectionHeader) return renderSectionHeader(section);
    return (
      <Box height={px(28)} backgroundColor="background" justifyContent="center" paddingLeft="x4">
        <Text color="gray500">{section.title.toUpperCase()}</Text>
      </Box>
    );
  };

  const _renderItem = ({ section, row }: IndexPath) => {
    const item = data[section].items[row];

    if (renderItem) return renderItem(item);
    return (
      <TouchableOpacity onPress={() => onPress?.(item)} activeOpacity={0.8}>
        <Flex
          height={px(56)}
          alignItems="center"
          paddingLeft="x4"
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
              {item.name?.substring(0, 1)}
            </Text>
          </Box>
          <Box marginLeft="x2">
            <Text>{item.name}</Text>
          </Box>
        </Flex>
      </TouchableOpacity>
    );
  };

  const renderLetterItem = (info: ListRenderItemInfo<string>) => {
    if (renderIndexItem) return renderIndexItem(info);

    const { item } = info;
    return (
      <TouchableOpacity key={item} onPress={handleLetterSelect(item)}>
        <Box width={px(16)} height={px(20)} borderRadius="x4" justifyContent="center" alignItems="center">
          <Text>{item.toUpperCase()}</Text>
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
      <LargeList
        ref={listRef}
        data={data}
        heightForSection={() => 40}
        renderSection={_renderSection}
        heightForIndexPath={() => 60}
        renderIndexPath={_renderItem}
        allLoaded
        renderFooter={renderListFooter}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
        {...rest}
      />
      <FlatList
        data={letters}
        keyExtractor={item => item}
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
          height: letters.length * px(20),
        }}
      />
    </>
  );
}
