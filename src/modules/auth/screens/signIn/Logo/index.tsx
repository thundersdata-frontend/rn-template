import { useTheme } from '@shopify/restyle';
import { Box, Image, Text, helpers } from '@td-design/react-native';
import { AppTheme } from 'theme';

const { px } = helpers;
export function Logo() {
  const theme = useTheme<AppTheme>();

  return (
    <Box marginLeft="x6" marginBottom={'x6'} marginTop={'x10'}>
      <Image
        source={require('../../../assets/logo.webp')}
        style={{
          width: px(72),
          height: px(72),
          marginBottom: px(20),
        }}
      />
      <Text
        style={{
          fontSize: px(24),
          lineHeight: px(32),
          color: theme.colors.white,
        }}
      >
        欢迎来到雷数科技！
      </Text>
    </Box>
  );
}
