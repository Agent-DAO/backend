import { TokensTradedEvent } from 'src/events/tokens-traded-event/tokens-traded-event.entity';
import { Block } from '../block/block.entity';
import { Token } from '../token/token.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { BlockchainType, ExchangeId } from '../deployment/deployment.service';

@Entity({ name: 'pairs' })
export class Pair {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: BlockchainType })
  @Index()
  blockchainType: BlockchainType;

  @Column({ type: 'enum', enum: ExchangeId })
  @Index()
  exchangeId: ExchangeId;

  @ManyToOne(() => Block, { eager: true })
  block: Block;

  @ManyToOne(() => Token, { eager: true })
  token0: Token;

  @ManyToOne(() => Token, { eager: true })
  token1: Token;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => TokensTradedEvent, (tokenTradedEvent) => tokenTradedEvent.pair)
  tokensTradedEvents: TokensTradedEvent[];
}
