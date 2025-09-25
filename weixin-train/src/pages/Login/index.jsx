import { Button, Input, Text, View } from "@tarojs/components";

export default function Login() {
  return (
    <View className="login-container">
      <View className="logo-wrapper">
        <Text className="logo-text">cigni</Text>
        <View className="dot dot-green"></View>
        <View className="dot dot-blue"></View>
        <View className="dot dot-blue"></View>
        <Text className="logo-text">fi</Text>
      </View>

      <Text className="title">Login to your Account</Text>

      <View className="input-group">
        <Input
          className="input-field"
          type="email"
          placeholder="Email"
          placeholderClass="placeholder"
        />
      </View>

      <View className="input-group">
        <Input
          className="input-field"
          type="password"
          placeholder="Password"
          placeholderClass="placeholder"
        />
      </View>

      <Button className="sign-in-btn" onClick={handleLogin}>
        Sign in
      </Button>

      <Text className="divider">- Or sign in with -</Text>

      <View className="social-buttons">
        <View className="social-btn google">
          <Text>G</Text>
        </View>
        <View className="social-btn facebook">
          <Text>f</Text>
        </View>
        <View className="social-btn twitter">
          <Text>🐦</Text>
        </View>
      </View>

      <View className="signup-link">
        <Text>Don't have an account? </Text>
        <Text className="link">Sign up</Text>
      </View>
    </View>
  );
}
