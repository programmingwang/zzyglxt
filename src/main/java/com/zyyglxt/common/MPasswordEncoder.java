package com.zyyglxt.common;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * @Author wanglx
 * @Date 2020/11/5 0005 10:21
 * @Version 1.0
 * 自定义加密
 */
public class MPasswordEncoder implements PasswordEncoder {
    @Override
    public String encode(CharSequence charSequence) {
        return DigestUtils.md5Hex(charSequence+"wlx");
    }

    @Override
    public boolean matches(CharSequence charSequence, String s) {
        return encode(charSequence).equals(s);
    }
}
