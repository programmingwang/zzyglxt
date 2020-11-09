package com.zyyglxt.util;

import com.zyyglxt.error.EmBusinessError;

public class ResultTool {
    public static JsonResult success() {
        return new JsonResult(true);
    }

    public static <T> JsonResult<T> success(T data) {
        return new JsonResult(true, data);
    }

    public static JsonResult fail() {
        return new JsonResult(false);
    }

    public static JsonResult fail(EmBusinessError resultEnum) {
        return new JsonResult(false, resultEnum);
    }
}
