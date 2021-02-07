package com.zyyglxt.config;

import org.ehcache.CacheManager;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.CacheManagerBuilder;
import org.ehcache.config.builders.ExpiryPolicyBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

/**
 * @author wzh
 * @version 1.0
 * @date 2021/2/7 3:53 下午
 */
@Configuration
public class EhCacheConfig {
    @Bean
    public CacheManager cacheManager() {
        CacheManager cacheManager = CacheManagerBuilder.newCacheManagerBuilder()
                .withCache("mainPageData",
                        CacheConfigurationBuilder.newCacheConfigurationBuilder(String.class, Object.class,
                                ResourcePoolsBuilder.heap(1000L))
                                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofMinutes(20))))
                .build();
        cacheManager.init();
        return cacheManager;
    }

}
