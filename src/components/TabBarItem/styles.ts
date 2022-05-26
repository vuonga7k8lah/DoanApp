import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    position: 'absolute',
    top: -1,
    left: 0,
    height: 2,
    width: '100%',
  },
  icon: {
    marginBottom: -1,
  },
  label: {
    paddingLeft: 3,
    paddingRight: 3,
    fontSize: 11,
    fontWeight: '500',
  },
  badge: {
    position: 'absolute',
    top: 0,
    left: 18,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
