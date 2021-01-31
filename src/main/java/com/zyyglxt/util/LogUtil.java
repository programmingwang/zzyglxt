package com.zyyglxt.util;


import com.zyyglxt.dataobject.LogDO;
import com.zyyglxt.service.ILogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;


public class LogUtil {

    private final  Logger logger = LoggerFactory.getLogger(LogUtil.class);
    private  ExecutorService executorService = Executors.newFixedThreadPool(2);

    private  ILogService logService = ApplicationContextHolder.getBean("logServiceImpl");

    public  void writeMainLog(LogDO logDO) {
        executorService.execute(new Runnable() {
            @Override
            public void run() {
                try {
                    if (logService != null) {
                        logger.info("---插入日志start---");
                        logService.saveLogDO(logDO);
                        logger.info("---插入日志end---");
                    } else {
                        logger.error("spring init bean mainService fail,please check configs");
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });


        /*
        1、停止接收新的submit的任务
        2、已经提交的任务（包括正在跑的和队列中等待的）,会继续执行完成
        3、等到第2步完成后，才真正停止
         */
        executorService.shutdown();// 一定要调用这个方法，不然executorService.isTerminated()永远不为true
        while (true) { // 等待所有任务都结束了继续执行
            try {
                if (executorService.isTerminated()) {
                    System.out.println("所有的子线程都结束了！");
                    break;
                }
                Thread.sleep(1000);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

    }
}